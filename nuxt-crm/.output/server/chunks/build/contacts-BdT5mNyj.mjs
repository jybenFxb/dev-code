import { E as ElButton } from './el-button-K9fBFT48.mjs';
import { E as ElCard } from './el-card-Ke6bVVp2.mjs';
import { E as ElTable, a as ElTableColumn } from './index-3yF-gldY.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useCrmStore } from './crm-CRdTLHBG.mjs';
import './base-ntEGVrK7.mjs';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
import '@popperjs/core';
import '@ctrl/tinycolor';
import 'normalize-wheel-es';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contacts",
  __ssrInlineRender: true,
  setup(__props) {
    const crmStore = useCrmStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_card = ElCard;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "contacts-container" }, _attrs))}><div class="page-header"><h2 class="page-title">\u8054\u7CFB\u4EBA</h2>`);
      _push(ssrRenderComponent(_component_el_button, { type: "primary" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u65B0\u5EFA\u8054\u7CFB\u4EBA`);
          } else {
            return [
              createTextVNode("\u65B0\u5EFA\u8054\u7CFB\u4EBA")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_el_card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, {
              data: unref(crmStore).contacts,
              style: { "width": "100%" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "id",
                    label: "\u5E8F\u53F7",
                    width: "80"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "name",
                    label: "\u59D3\u540D",
                    width: "120"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "company",
                    label: "\u516C\u53F8",
                    "min-width": "180"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "position",
                    label: "\u804C\u4F4D",
                    width: "120"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "email",
                    label: "\u90AE\u7BB1",
                    width: "180"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "phone",
                    label: "\u7535\u8BDD",
                    width: "150"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "source",
                    label: "\u6765\u6E90",
                    width: "120"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u64CD\u4F5C",
                    width: "150",
                    fixed: "right"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          link: "",
                          type: "primary",
                          size: "small"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u7F16\u8F91`);
                            } else {
                              return [
                                createTextVNode("\u7F16\u8F91")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, {
                          link: "",
                          type: "danger",
                          size: "small"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`\u5220\u9664`);
                            } else {
                              return [
                                createTextVNode("\u5220\u9664")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            link: "",
                            type: "primary",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u7F16\u8F91")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_button, {
                            link: "",
                            type: "danger",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u5220\u9664")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      prop: "id",
                      label: "\u5E8F\u53F7",
                      width: "80"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "name",
                      label: "\u59D3\u540D",
                      width: "120"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "company",
                      label: "\u516C\u53F8",
                      "min-width": "180"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "position",
                      label: "\u804C\u4F4D",
                      width: "120"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "email",
                      label: "\u90AE\u7BB1",
                      width: "180"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "phone",
                      label: "\u7535\u8BDD",
                      width: "150"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "source",
                      label: "\u6765\u6E90",
                      width: "120"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u64CD\u4F5C",
                      width: "150",
                      fixed: "right"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          link: "",
                          type: "primary",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u7F16\u8F91")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_button, {
                          link: "",
                          type: "danger",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u5220\u9664")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table, {
                data: unref(crmStore).contacts,
                style: { "width": "100%" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    prop: "id",
                    label: "\u5E8F\u53F7",
                    width: "80"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "name",
                    label: "\u59D3\u540D",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "company",
                    label: "\u516C\u53F8",
                    "min-width": "180"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "position",
                    label: "\u804C\u4F4D",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "email",
                    label: "\u90AE\u7BB1",
                    width: "180"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "phone",
                    label: "\u7535\u8BDD",
                    width: "150"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "source",
                    label: "\u6765\u6E90",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u64CD\u4F5C",
                    width: "150",
                    fixed: "right"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_button, {
                        link: "",
                        type: "primary",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u7F16\u8F91")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_button, {
                        link: "",
                        type: "danger",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u5220\u9664")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contacts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contacts-BdT5mNyj.mjs.map
