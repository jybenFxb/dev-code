import { E as ElButton } from "./el-button-K9fBFT48.js";
import { E as ElCard } from "./el-card-Ke6bVVp2.js";
import { E as ElTable, a as ElTableColumn } from "./index-3yF-gldY.js";
import { E as ElTag } from "./index-CFisVmGQ.js";
import { E as ElProgress } from "./index-msx-EPVQ.js";
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
  __name: "opportunities",
  __ssrInlineRender: true,
  setup(__props) {
    const crmStore = useCrmStore();
    const formatAmount = (amount) => {
      return new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 0 }).format(amount);
    };
    const getStageTagType = (stage) => {
      const map = {
        "prospecting": "info",
        "qualification": "primary",
        "proposal": "warning",
        "negotiation": "primary",
        "closed_won": "success",
        "closed_lost": "danger"
      };
      return map[stage] || "info";
    };
    const getStageText = (stage) => {
      const map = {
        "prospecting": "初期沟通",
        "qualification": "立项评估",
        "proposal": "方案报价",
        "negotiation": "商务谈判",
        "closed_won": "赢单",
        "closed_lost": "输单"
      };
      return map[stage] || stage;
    };
    const getProbabilityColor = (percentage) => {
      if (percentage < 30) return "#909399";
      if (percentage < 70) return "#E6A23C";
      if (percentage < 100) return "#409EFF";
      return "#67C23A";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_button = ElButton;
      const _component_el_card = ElCard;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      const _component_el_progress = ElProgress;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "opportunities-container" }, _attrs))}><div class="page-header"><h2 class="page-title">商机管理</h2>`);
      _push(ssrRenderComponent(_component_el_button, { type: "primary" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`新建商机`);
          } else {
            return [
              createTextVNode("新建商机")
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
              data: unref(crmStore).opportunities,
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
                    prop: "name",
                    label: "商机名称",
                    "min-width": "180"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "customer",
                    label: "客户",
                    "min-width": "180"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "amount",
                    label: "金额",
                    width: "120"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(formatAmount(row.amount))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(formatAmount(row.amount)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "stage",
                    label: "阶段",
                    width: "120"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: getStageTagType(row.stage)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(getStageText(row.stage))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(getStageText(row.stage)), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, {
                            type: getStageTagType(row.stage)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getStageText(row.stage)), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "probability",
                    label: "赢单概率",
                    width: "150"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_progress, {
                          percentage: row.probability,
                          color: getProbabilityColor(row.probability)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_progress, {
                            percentage: row.probability,
                            color: getProbabilityColor(row.probability)
                          }, null, 8, ["percentage", "color"])
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
                    prop: "expectedCloseDate",
                    label: "预计关闭日期",
                    width: "150"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "操作",
                    width: "120",
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
                              _push5(`查看`);
                            } else {
                              return [
                                createTextVNode("查看")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_button, {
                          link: "",
                          type: "primary",
                          size: "small"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`推进`);
                            } else {
                              return [
                                createTextVNode("推进")
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
                              createTextVNode("查看")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_button, {
                            link: "",
                            type: "primary",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("推进")
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
                      prop: "name",
                      label: "商机名称",
                      "min-width": "180"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "customer",
                      label: "客户",
                      "min-width": "180"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "amount",
                      label: "金额",
                      width: "120"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(formatAmount(row.amount)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "stage",
                      label: "阶段",
                      width: "120"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: getStageTagType(row.stage)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(getStageText(row.stage)), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "probability",
                      label: "赢单概率",
                      width: "150"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_progress, {
                          percentage: row.probability,
                          color: getProbabilityColor(row.probability)
                        }, null, 8, ["percentage", "color"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "owner",
                      label: "负责人",
                      width: "120"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "expectedCloseDate",
                      label: "预计关闭日期",
                      width: "150"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "操作",
                      width: "120",
                      fixed: "right"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          link: "",
                          type: "primary",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("查看")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_button, {
                          link: "",
                          type: "primary",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("推进")
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
                data: unref(crmStore).opportunities,
                style: { "width": "100%" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    prop: "id",
                    label: "序号",
                    width: "80"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "name",
                    label: "商机名称",
                    "min-width": "180"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "customer",
                    label: "客户",
                    "min-width": "180"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "amount",
                    label: "金额",
                    width: "120"
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(formatAmount(row.amount)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "stage",
                    label: "阶段",
                    width: "120"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_tag, {
                        type: getStageTagType(row.stage)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(getStageText(row.stage)), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "probability",
                    label: "赢单概率",
                    width: "150"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_progress, {
                        percentage: row.probability,
                        color: getProbabilityColor(row.probability)
                      }, null, 8, ["percentage", "color"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "owner",
                    label: "负责人",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "expectedCloseDate",
                    label: "预计关闭日期",
                    width: "150"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "操作",
                    width: "120",
                    fixed: "right"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_button, {
                        link: "",
                        type: "primary",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("查看")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_button, {
                        link: "",
                        type: "primary",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("推进")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/opportunities.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=opportunities-B0-fDnob.js.map
