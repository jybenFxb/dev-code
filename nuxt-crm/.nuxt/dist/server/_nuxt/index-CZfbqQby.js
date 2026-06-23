import { defineComponent, withAsyncContext, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import "D:/test-code/nuxt-crm/node_modules/hookable/dist/index.mjs";
import { n as navigateTo } from "../server.mjs";
import "D:/test-code/nuxt-crm/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/test-code/nuxt-crm/node_modules/unctx/dist/index.mjs";
import "D:/test-code/nuxt-crm/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/test-code/nuxt-crm/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/test-code/nuxt-crm/node_modules/ufo/dist/index.mjs";
import "D:/test-code/nuxt-crm/node_modules/klona/dist/index.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    [__temp, __restore] = withAsyncContext(() => navigateTo("/dashboard")), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CZfbqQby.js.map
