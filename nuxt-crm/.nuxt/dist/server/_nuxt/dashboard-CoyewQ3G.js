import { E as ElRow, a as ElCol } from "./el-col-4l0PXdit.js";
import { E as ElCard } from "./el-card-Ke6bVVp2.js";
import { E as ElIcon, a0 as trend_charts_default, a1 as connection_default, a2 as money_default, a3 as trophy_default } from "./base-ntEGVrK7.js";
import { E as ElTable, a as ElTableColumn } from "./index-3yF-gldY.js";
import { E as ElTag } from "./index-CFisVmGQ.js";
/* empty css                   */
/* empty css                    */
/* empty css                         */
/* empty css                */
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from "vue/server-renderer";
import "D:/test-code/nuxt-crm/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "./typescript-D6L75muK.js";
import "@vue/shared";
import "@vueuse/core";
import "lodash-unified";
import "@popperjs/core";
import "normalize-wheel-es";
import "D:/test-code/nuxt-crm/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/test-code/nuxt-crm/node_modules/unctx/dist/index.mjs";
import "D:/test-code/nuxt-crm/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/test-code/nuxt-crm/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/test-code/nuxt-crm/node_modules/ufo/dist/index.mjs";
import "D:/test-code/nuxt-crm/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const recentActivities = ref([
      { time: "2025-02-25 10:30", type: "新增客户", desc: '添加了新客户"杭州电商网络有限公司"', operator: "王销售", tagType: "success" },
      { time: "2025-02-25 09:15", type: "状态变更", desc: '将商机"A公司采购项目"阶段更新为"谈判"', operator: "李销售", tagType: "warning" },
      { time: "2025-02-24 16:45", type: "新建线索", desc: "从官网渠道获取了一条新线索", operator: "系统自动", tagType: "info" },
      { time: "2025-02-24 14:20", type: "签单成功", desc: '成功签署"C公司新签项目"合同', operator: "张销售", tagType: "danger" },
      { time: "2025-02-24 11:00", type: "跟进记录", desc: '电话拜访了"上海贸易有限责任公司"的李四', operator: "王销售", tagType: "primary" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_card = ElCard;
      const _component_el_icon = ElIcon;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-container" }, _attrs))} data-v-0f3cd699><div class="page-header" data-v-0f3cd699><h2 class="page-title" data-v-0f3cd699>仪表盘</h2></div>`);
      _push(ssrRenderComponent(_component_el_row, {
        gutter: 20,
        class: "stat-cards"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_card, {
                    shadow: "hover",
                    class: "stat-card"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="stat-icon" style="${ssrRenderStyle({ "color": "#67C23A", "background": "#f0f9eb" })}" data-v-0f3cd699${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(trend_charts_default), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(trend_charts_default))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="stat-info" data-v-0f3cd699${_scopeId3}><div class="stat-title" data-v-0f3cd699${_scopeId3}>客户总数</div><div class="stat-value" data-v-0f3cd699${_scopeId3}>156</div></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "stat-icon",
                            style: { "color": "#67C23A", "background": "#f0f9eb" }
                          }, [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(trend_charts_default))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "stat-info" }, [
                            createVNode("div", { class: "stat-title" }, "客户总数"),
                            createVNode("div", { class: "stat-value" }, "156")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, {
                      shadow: "hover",
                      class: "stat-card"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "stat-icon",
                          style: { "color": "#67C23A", "background": "#f0f9eb" }
                        }, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(trend_charts_default))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "stat-info" }, [
                          createVNode("div", { class: "stat-title" }, "客户总数"),
                          createVNode("div", { class: "stat-value" }, "156")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_card, {
                    shadow: "hover",
                    class: "stat-card"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="stat-icon" style="${ssrRenderStyle({ "color": "#409EFF", "background": "#ecf5ff" })}" data-v-0f3cd699${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(connection_default), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(connection_default))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="stat-info" data-v-0f3cd699${_scopeId3}><div class="stat-title" data-v-0f3cd699${_scopeId3}>线索数</div><div class="stat-value" data-v-0f3cd699${_scopeId3}>89</div></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "stat-icon",
                            style: { "color": "#409EFF", "background": "#ecf5ff" }
                          }, [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(connection_default))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "stat-info" }, [
                            createVNode("div", { class: "stat-title" }, "线索数"),
                            createVNode("div", { class: "stat-value" }, "89")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, {
                      shadow: "hover",
                      class: "stat-card"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "stat-icon",
                          style: { "color": "#409EFF", "background": "#ecf5ff" }
                        }, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(connection_default))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "stat-info" }, [
                          createVNode("div", { class: "stat-title" }, "线索数"),
                          createVNode("div", { class: "stat-value" }, "89")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_card, {
                    shadow: "hover",
                    class: "stat-card"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="stat-icon" style="${ssrRenderStyle({ "color": "#E6A23C", "background": "#fdf6ec" })}" data-v-0f3cd699${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(money_default), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(money_default))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="stat-info" data-v-0f3cd699${_scopeId3}><div class="stat-title" data-v-0f3cd699${_scopeId3}>商机数</div><div class="stat-value" data-v-0f3cd699${_scopeId3}>34</div></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "stat-icon",
                            style: { "color": "#E6A23C", "background": "#fdf6ec" }
                          }, [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(money_default))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "stat-info" }, [
                            createVNode("div", { class: "stat-title" }, "商机数"),
                            createVNode("div", { class: "stat-value" }, "34")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, {
                      shadow: "hover",
                      class: "stat-card"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "stat-icon",
                          style: { "color": "#E6A23C", "background": "#fdf6ec" }
                        }, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(money_default))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "stat-info" }, [
                          createVNode("div", { class: "stat-title" }, "商机数"),
                          createVNode("div", { class: "stat-value" }, "34")
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, { span: 6 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_card, {
                    shadow: "hover",
                    class: "stat-card"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="stat-icon" style="${ssrRenderStyle({ "color": "#909399", "background": "#f4f4f5" })}" data-v-0f3cd699${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_icon, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(trophy_default), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(trophy_default))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="stat-info" data-v-0f3cd699${_scopeId3}><div class="stat-title" data-v-0f3cd699${_scopeId3}>本月成交</div><div class="stat-value" data-v-0f3cd699${_scopeId3}>12</div></div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "stat-icon",
                            style: { "color": "#909399", "background": "#f4f4f5" }
                          }, [
                            createVNode(_component_el_icon, null, {
                              default: withCtx(() => [
                                createVNode(unref(trophy_default))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "stat-info" }, [
                            createVNode("div", { class: "stat-title" }, "本月成交"),
                            createVNode("div", { class: "stat-value" }, "12")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, {
                      shadow: "hover",
                      class: "stat-card"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "stat-icon",
                          style: { "color": "#909399", "background": "#f4f4f5" }
                        }, [
                          createVNode(_component_el_icon, null, {
                            default: withCtx(() => [
                              createVNode(unref(trophy_default))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "stat-info" }, [
                          createVNode("div", { class: "stat-title" }, "本月成交"),
                          createVNode("div", { class: "stat-value" }, "12")
                        ])
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
              createVNode(_component_el_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, {
                    shadow: "hover",
                    class: "stat-card"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "stat-icon",
                        style: { "color": "#67C23A", "background": "#f0f9eb" }
                      }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(trend_charts_default))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "stat-info" }, [
                        createVNode("div", { class: "stat-title" }, "客户总数"),
                        createVNode("div", { class: "stat-value" }, "156")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, {
                    shadow: "hover",
                    class: "stat-card"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "stat-icon",
                        style: { "color": "#409EFF", "background": "#ecf5ff" }
                      }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(connection_default))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "stat-info" }, [
                        createVNode("div", { class: "stat-title" }, "线索数"),
                        createVNode("div", { class: "stat-value" }, "89")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, {
                    shadow: "hover",
                    class: "stat-card"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "stat-icon",
                        style: { "color": "#E6A23C", "background": "#fdf6ec" }
                      }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(money_default))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "stat-info" }, [
                        createVNode("div", { class: "stat-title" }, "商机数"),
                        createVNode("div", { class: "stat-value" }, "34")
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_col, { span: 6 }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, {
                    shadow: "hover",
                    class: "stat-card"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "stat-icon",
                        style: { "color": "#909399", "background": "#f4f4f5" }
                      }, [
                        createVNode(_component_el_icon, null, {
                          default: withCtx(() => [
                            createVNode(unref(trophy_default))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "stat-info" }, [
                        createVNode("div", { class: "stat-title" }, "本月成交"),
                        createVNode("div", { class: "stat-value" }, "12")
                      ])
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
      }, _parent));
      _push(ssrRenderComponent(_component_el_row, {
        gutter: 20,
        class: "chart-cards"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_card, { header: "销售趋势" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="chart-placeholder" style="${ssrRenderStyle({ "color": "#409EFF" })}" data-v-0f3cd699${_scopeId3}>销售趋势图表占位</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "chart-placeholder",
                            style: { "color": "#409EFF" }
                          }, "销售趋势图表占位")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, { header: "销售趋势" }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "chart-placeholder",
                          style: { "color": "#409EFF" }
                        }, "销售趋势图表占位")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_col, { span: 12 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_card, { header: "客户分布" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="chart-placeholder" style="${ssrRenderStyle({ "color": "#67C23A" })}" data-v-0f3cd699${_scopeId3}>客户分布图表占位</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "chart-placeholder",
                            style: { "color": "#67C23A" }
                          }, "客户分布图表占位")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, { header: "客户分布" }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "chart-placeholder",
                          style: { "color": "#67C23A" }
                        }, "客户分布图表占位")
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
              createVNode(_component_el_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, { header: "销售趋势" }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "chart-placeholder",
                        style: { "color": "#409EFF" }
                      }, "销售趋势图表占位")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, { header: "客户分布" }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "chart-placeholder",
                        style: { "color": "#67C23A" }
                      }, "客户分布图表占位")
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
      }, _parent));
      _push(ssrRenderComponent(_component_el_card, {
        header: "最近活动",
        class: "activity-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, {
              data: unref(recentActivities),
              style: { "width": "100%" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "time",
                    label: "时间",
                    width: "180"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "type",
                    label: "类型",
                    width: "120"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: row.tagType
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(row.type)}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.type), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, {
                            type: row.tagType
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.type), 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "desc",
                    label: "描述"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "operator",
                    label: "操作人",
                    width: "120"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      prop: "time",
                      label: "时间",
                      width: "180"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "type",
                      label: "类型",
                      width: "120"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: row.tagType
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.type), 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "desc",
                      label: "描述"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "operator",
                      label: "操作人",
                      width: "120"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_table, {
                data: unref(recentActivities),
                style: { "width": "100%" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_table_column, {
                    prop: "time",
                    label: "时间",
                    width: "180"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "type",
                    label: "类型",
                    width: "120"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_tag, {
                        type: row.tagType
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.type), 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "desc",
                    label: "描述"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "operator",
                    label: "操作人",
                    width: "120"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0f3cd699"]]);
export {
  dashboard as default
};
//# sourceMappingURL=dashboard-CoyewQ3G.js.map
