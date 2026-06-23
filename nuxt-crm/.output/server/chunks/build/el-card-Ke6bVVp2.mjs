import { a as withInstall, R as useGlobalConfig, b as buildProps, d as definePropType } from './base-ntEGVrK7.mjs';
import { d as useNamespace } from './server.mjs';
import { defineComponent, openBlock, createElementBlock, normalizeClass, unref, renderSlot, createTextVNode, toDisplayString, createCommentVNode, createElementVNode, normalizeStyle } from 'vue';
import { isClient } from '@vueuse/core';

const cardProps = buildProps({
  /**
  * @description title of the card. Also accepts a DOM passed by `slot#header`
  */
  header: {
    type: String,
    default: ""
  },
  /**
  * @description content of footer. Also accepts a DOM passed by `slot#footer`
  */
  footer: {
    type: String,
    default: ""
  },
  /**
  * @description CSS style of card body
  */
  bodyStyle: {
    type: definePropType([
      String,
      Object,
      Array,
      Boolean
    ]),
    default: ""
  },
  /**
  * @description custom class name of card footer
  */
  headerClass: String,
  /**
  * @description custom class name of card body
  */
  bodyClass: String,
  /**
  * @description custom class name of card footer
  */
  footerClass: String,
  /**
  * @description when to show card shadows
  */
  shadow: {
    type: String,
    values: [
      "always",
      "hover",
      "never"
    ],
    default: void 0
  }
});
var card_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElCard",
  __name: "card",
  props: cardProps,
  setup(__props) {
    const globalConfig = useGlobalConfig("card");
    const ns = useNamespace("card");
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", { class: normalizeClass([unref(ns).b(), unref(ns).is(`${__props.shadow || ((_a = unref(globalConfig)) == null ? void 0 : _a.shadow) || "always"}-shadow`)]) }, [
        _ctx.$slots.header || __props.header ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([unref(ns).e("header"), __props.headerClass])
        }, [renderSlot(_ctx.$slots, "header", {}, () => [createTextVNode(toDisplayString(__props.header), 1)])], 2)) : createCommentVNode("v-if", true),
        createElementVNode("div", {
          class: normalizeClass([unref(ns).e("body"), __props.bodyClass]),
          style: normalizeStyle(__props.bodyStyle)
        }, [renderSlot(_ctx.$slots, "default")], 6),
        _ctx.$slots.footer || __props.footer ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass([unref(ns).e("footer"), __props.footerClass])
        }, [renderSlot(_ctx.$slots, "footer", {}, () => [createTextVNode(toDisplayString(__props.footer), 1)])], 2)) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var card_default = card_vue_vue_type_script_setup_true_lang_default;
const ElCard = withInstall(card_default);
const UPDATE_MODEL_EVENT = "update:modelValue";
const CHANGE_EVENT = "change";
const INPUT_EVENT = "input";
const rAF = (fn) => isClient ? (void 0).requestAnimationFrame(fn) : setTimeout(fn, 16);
const cAF = (handle) => isClient ? (void 0).cancelAnimationFrame(handle) : clearTimeout(handle);

export { CHANGE_EVENT as C, ElCard as E, INPUT_EVENT as I, UPDATE_MODEL_EVENT as U, cAF as c, rAF as r };
//# sourceMappingURL=el-card-Ke6bVVp2.mjs.map
