/**
 * Lightweight React-compatible Declarative Component Engine
 * Provides React 18 compatible core primitives:
 * - React.createElement(type, props, ...children)
 * - React.useState(initial)
 * - React.useEffect(callback, deps)
 * - React.useRef(initial)
 * - ReactDOM.createRoot(container).render(element)
 *
 * Runs 100% offline with ZERO external dependencies or build tools.
 * Perfect for academic DAA assignment demonstrations.
 */

(function (global) {
  let currentComponent = null;
  let hookIndex = 0;
  let rootInstance = null;

  function createElement(type, props, ...children) {
    const flatChildren = children
      .flat(Infinity)
      .filter((c) => c !== null && c !== undefined && c !== false)
      .map((c) => (typeof c === "object" ? c : createTextElement(c)));

    return {
      type,
      props: {
        ...(props || {}),
        children: flatChildren,
      },
    };
  }

  function createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: String(text),
        children: [],
      },
    };
  }

  function useState(initialValue) {
    if (!currentComponent) {
      throw new Error("useState called outside of component render");
    }
    const comp = currentComponent;
    const idx = hookIndex++;

    if (!comp.hooks[idx]) {
      comp.hooks[idx] = {
        state: typeof initialValue === "function" ? initialValue() : initialValue,
      };
    }

    const hook = comp.hooks[idx];

    const setState = (action) => {
      const nextValue = typeof action === "function" ? action(hook.state) : action;
      if (nextValue !== hook.state) {
        hook.state = nextValue;
        comp.scheduleUpdate();
      }
    };

    return [hook.state, setState];
  }

  function useEffect(callback, deps) {
    if (!currentComponent) {
      throw new Error("useEffect called outside of component render");
    }
    const comp = currentComponent;
    const idx = hookIndex++;

    const oldHook = comp.hooks[idx];
    const hasChanged = !oldHook || !deps || deps.some((d, i) => !Object.is(d, oldHook.deps[i]));

    if (hasChanged) {
      if (oldHook && typeof oldHook.cleanup === "function") {
        try {
          oldHook.cleanup();
        } catch (e) {
          console.error("useEffect cleanup error:", e);
        }
      }
      comp.effects.push({
        callback,
        hookIdx: idx,
        deps,
      });
    }

    comp.hooks[idx] = {
      deps,
      cleanup: oldHook ? oldHook.cleanup : undefined,
    };
  }

  function useRef(initialValue) {
    if (!currentComponent) {
      throw new Error("useRef called outside of component render");
    }
    const comp = currentComponent;
    const idx = hookIndex++;

    if (!comp.hooks[idx]) {
      comp.hooks[idx] = { current: initialValue };
    }
    return comp.hooks[idx];
  }

  function createDom(vnode) {
    if (vnode.type === "TEXT_ELEMENT") {
      return document.createTextNode(vnode.props.nodeValue);
    }

    const dom = document.createElement(vnode.type);
    updateDom(dom, {}, vnode.props);
    return dom;
  }

  function updateDom(dom, prevProps, nextProps) {
    // Remove old listeners
    Object.keys(prevProps)
      .filter((k) => k.startsWith("on"))
      .forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
      });

    // Remove old attributes
    Object.keys(prevProps)
      .filter((k) => k !== "children" && !k.startsWith("on") && k !== "dangerouslySetInnerHTML")
      .forEach((name) => {
        if (!(name in nextProps)) {
          dom.removeAttribute(name);
        }
      });

    // Set new or changed attributes
    Object.keys(nextProps)
      .filter((k) => k !== "children" && !k.startsWith("on") && k !== "dangerouslySetInnerHTML")
      .forEach((name) => {
        if (prevProps[name] !== nextProps[name]) {
          if (name === "className") {
            dom.setAttribute("class", nextProps[name]);
          } else if (name === "style" && typeof nextProps[name] === "object") {
            Object.assign(dom.style, nextProps[name]);
          } else if (name === "disabled") {
            if (nextProps[name]) dom.setAttribute("disabled", "");
            else dom.removeAttribute("disabled");
          } else if (name === "value" && (dom.tagName === "INPUT" || dom.tagName === "SELECT")) {
            dom.value = nextProps[name];
          } else {
            dom.setAttribute(name, nextProps[name]);
          }
        }
      });

    // Handle dangerouslySetInnerHTML
    if (nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html !== undefined) {
      dom.innerHTML = nextProps.dangerouslySetInnerHTML.__html;
    }

    // Add new listeners
    Object.keys(nextProps)
      .filter((k) => k.startsWith("on"))
      .forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        if (nextProps[name]) {
          dom.addEventListener(eventType, nextProps[name]);
        }
      });
  }

  function reconcileChildren(wipFiber, elements) {
    let index = 0;
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
    let prevSibling = null;

    while (index < elements.length || oldFiber != null) {
      const element = elements[index];
      let newFiber = null;

      const sameType = oldFiber && element && element.type === oldFiber.type;

      if (sameType) {
        newFiber = {
          type: oldFiber.type,
          props: element.props,
          dom: oldFiber.dom,
          parent: wipFiber,
          alternate: oldFiber,
          effectTag: "UPDATE",
        };
      }
      if (element && !sameType) {
        newFiber = {
          type: element.type,
          props: element.props,
          dom: null,
          parent: wipFiber,
          alternate: null,
          effectTag: "PLACEMENT",
        };
      }
      if (oldFiber && !sameType) {
        oldFiber.effectTag = "DELETION";
        if (!wipFiber.deletions) wipFiber.deletions = [];
        wipFiber.deletions.push(oldFiber);
      }

      if (oldFiber) {
        oldFiber = oldFiber.sibling;
      }

      if (index === 0) {
        wipFiber.child = newFiber;
      } else if (prevSibling && newFiber) {
        prevSibling.sibling = newFiber;
      }

      prevSibling = newFiber;
      index++;
    }
  }

  class ComponentInstance {
    constructor(ComponentClass, container) {
      this.ComponentClass = ComponentClass;
      this.container = container;
      this.hooks = [];
      this.effects = [];
      this.isUpdating = false;
      this.vdom = null;
    }

    scheduleUpdate() {
      if (this.isUpdating) return;
      this.isUpdating = true;
      requestAnimationFrame(() => {
        this.render();
        this.isUpdating = false;
      });
    }

    render() {
      currentComponent = this;
      hookIndex = 0;
      this.effects = [];

      try {
        const vnode = createElement(this.ComponentClass, {});
        renderVNodeToContainer(vnode, this.container);
      } finally {
        currentComponent = null;
      }

      // Run effects after DOM update
      for (const eff of this.effects) {
        const cleanup = eff.callback();
        if (typeof cleanup === "function") {
          this.hooks[eff.hookIdx].cleanup = cleanup;
        }
      }
    }
  }

  function renderVNodeToContainer(vnode, container) {
    const fragment = document.createDocumentFragment();
    mountVNode(vnode, fragment);
    container.innerHTML = "";
    container.appendChild(fragment);
  }

  function mountVNode(vnode, parentDom) {
    if (!vnode) return null;

    if (typeof vnode.type === "function") {
      const childVNode = vnode.type(vnode.props);
      return mountVNode(childVNode, parentDom);
    }

    const dom = createDom(vnode);

    if (vnode.props && vnode.props.children) {
      for (const child of vnode.props.children) {
        mountVNode(child, dom);
      }
    }

    parentDom.appendChild(dom);
    return dom;
  }

  function createRoot(container) {
    return {
      render(element) {
        const ComponentFn = typeof element.type === "function" ? element.type : () => element;
        const instance = new ComponentInstance(ComponentFn, container);
        rootInstance = instance;
        instance.render();
      },
    };
  }

  // HTML tagged template literal helper for JSX-like ergonomic syntax
  // e.g. html`<div class="foo">${children}</div>`
  function html(strings, ...values) {
    // Return standard virtual node
    let raw = "";
    strings.forEach((str, i) => {
      raw += str;
      if (i < values.length) {
        raw += `__REACT_VAL_${i}__`;
      }
    });

    const template = document.createElement("template");
    template.innerHTML = raw.trim();

    return domToVNode(template.content.firstChild, values);
  }

  function domToVNode(node, values) {
    if (!node) return null;

    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      const match = text.match(/__REACT_VAL_(\d+)__/);
      if (match) {
        const val = values[parseInt(match[1], 10)];
        return val;
      }
      return text;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      const props = {};

      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        let val = attr.value;
        const match = val.match(/__REACT_VAL_(\d+)__/);
        if (match) {
          props[attr.name] = values[parseInt(match[1], 10)];
        } else {
          props[attr.name === "class" ? "className" : attr.name] = val;
        }
      }

      const children = [];
      for (let child = node.firstChild; child; child = child.nextSibling) {
        const childVNode = domToVNode(child, values);
        if (childVNode !== null && childVNode !== undefined) {
          children.push(childVNode);
        }
      }

      return createElement(tagName, props, ...children);
    }

    return null;
  }

  const React = {
    createElement,
    useState,
    useEffect,
    useRef,
    html,
  };

  const ReactDOM = {
    createRoot,
  };

  global.React = React;
  global.ReactDOM = ReactDOM;
  global.h = createElement;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { React, ReactDOM, h: createElement, html };
  }
})(typeof window !== "undefined" ? window : globalThis);
