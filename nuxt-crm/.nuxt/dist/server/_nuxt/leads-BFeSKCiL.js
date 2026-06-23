import { E as ElButton } from "./el-button-K9fBFT48.js";
import { E as ElCard } from "./el-card-Ke6bVVp2.js";
import { E as ElTable, a as ElTableColumn } from "./index-3yF-gldY.js";
import { E as ElTag } from "./index-CFisVmGQ.js";
import "./base-ntEGVrK7.js";
/* empty css                   */
/* empty css                    */
/* empty css                         */
/* empty css                */
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import "D:/test-code/nuxt-crm/node_modules/hookable/dist/index.mjs";
import { u as useCrmStore } from "./crm-CRdTLHBG.js";
import "../server.mjs";
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
import "@ctrl/tinycolor";
import "normalize-wheel-es";
import "@popperjs/core";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "leads",
  __ssrInlineRender: true,
  setup(__props) {
    const crmStore = useCrmStore();
    const getStatusTagType = (status) => {
      const map = {
        "new": "primary",
        "following": "warning",
        "converted": "success",
        "lost": "info"
      };
      return map[status] || "info";
    };
    const getStatusText = (status) => {
      const map = {
        "new": "新线索",
        "following": "跟进中",
        "converted": "已转化",
        "lost": "已流失"
      };
      return map[status] || status;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_card = ElCard;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "leads-container" }, _attrs))}><div class="page-header"><h2 class="page-title">线索管理</h2>`);
      _push(ssrRenderComponent(_component_el_button, { type: "primary" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`新建线索`);
          } else {
            return [
              createTextVNode("新建线索")
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
              data: unref(crmStore).leads,
              style: { "width": "100%" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "id",
                    label: "序号",
                    width: "80"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "source",
                    label: "来源",
                    width: "120"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "contact",
                    label: "联系人",
                    width: "120"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "phone",
                    label: "电话",
                    width: "150"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "intentProduct",
                    label: "意向产品",
                    "min-width": "150"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "status",
                    label: "状态",
                    width: "120"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: getStatusTagType(row.status)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(getStatusText(row.status))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(getStatusText(row.status)), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, {
                            type: getStatusTagType(row.status)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getStatusText(row.status)), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "owner",
                    label: "负责人",
                    width: "120"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "createdAt",
                    label: "创建时间",
                    width: "150"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "操作",
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
                              _push5(`跟进`);
                            } else {
                              return [
                                createTextVNode("跟进")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, {
                          link: "",
                          type: "success",
                          size: "small"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`转化`);
                            } else {
                              return [
                                createTextVNode("转化")
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
                              createTextVNode("跟进")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_button, {
                            link: "",
                            type: "success",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("转化")
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
                      label: "序号",
                      width: "80"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "source",
                      label: "来源",
                      width: "120"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "contact",
                      label: "联系人",
                      width: "120"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "phone",
                      label: "电话",
                      width: "150"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "intentProduct",
                      label: "意向产品",
                      "min-width": "150"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "status",
                      label: "状态",
                      width: "120"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: getStatusTagType(row.status)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getStatusText(row.status)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "owner",
                      label: "负责人",
                      width: "120"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "createdAt",
                      label: "创建时间",
                      width: "150"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "操作",
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
                            createTextVNode("跟进")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_button, {
                          link: "",
                          type: "success",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("转化")
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
                data: unref(crmStore).leads,
                style: { "width": "100%" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    prop: "id",
                    label: "序号",
                    width: "80"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "source",
                    label: "来源",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "contact",
                    label: "联系人",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "phone",
                    label: "电话",
                    width: "150"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "intentProduct",
                    label: "意向产品",
                    "min-width": "150"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "status",
                    label: "状态",
                    width: "120"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_tag, {
                        type: getStatusTagType(row.status)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(getStatusText(row.status)), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "owner",
                    label: "负责人",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "createdAt",
                    label: "创建时间",
                    width: "150"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "操作",
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
                          createTextVNode("跟进")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_button, {
                        link: "",
                        type: "success",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("转化")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/leads.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=leads-BFeSKCiL.js.map
