import { E as ElRow, a as ElCol } from './el-col-4l0PXdit.mjs';
import { E as ElCard } from './el-card-Ke6bVVp2.mjs';
import { E as ElIcon, J as trend_charts_default, K as connection_default, L as money_default, M as trophy_default } from './base-ntEGVrK7.mjs';
import { E as ElTable, a as ElTableColumn } from './index-3yF-gldY.mjs';
import { E as ElTag } from './index-CFisVmGQ.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import './typescript-D6L75muK.mjs';
import '@vue/shared';
import '@vueuse/core';
import 'lodash-unified';
import '@popperjs/core';
import 'normalize-wheel-es';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const recentActivities = ref([
      { time: "2025-02-25 10:30", type: "\u65B0\u589E\u5BA2\u6237", desc: '\u6DFB\u52A0\u4E86\u65B0\u5BA2\u6237"\u676D\u5DDE\u7535\u5546\u7F51\u7EDC\u6709\u9650\u516C\u53F8"', operator: "\u738B\u9500\u552E", tagType: "success" },
      { time: "2025-02-25 09:15", type: "\u72B6\u6001\u53D8\u66F4", desc: '\u5C06\u5546\u673A"A\u516C\u53F8\u91C7\u8D2D\u9879\u76EE"\u9636\u6BB5\u66F4\u65B0\u4E3A"\u8C08\u5224"', operator: "\u674E\u9500\u552E", tagType: "warning" },
      { time: "2025-02-24 16:45", type: "\u65B0\u5EFA\u7EBF\u7D22", desc: "\u4ECE\u5B98\u7F51\u6E20\u9053\u83B7\u53D6\u4E86\u4E00\u6761\u65B0\u7EBF\u7D22", operator: "\u7CFB\u7EDF\u81EA\u52A8", tagType: "info" },
      { time: "2025-02-24 14:20", type: "\u7B7E\u5355\u6210\u529F", desc: '\u6210\u529F\u7B7E\u7F72"C\u516C\u53F8\u65B0\u7B7E\u9879\u76EE"\u5408\u540C', operator: "\u5F20\u9500\u552E", tagType: "danger" },
      { time: "2025-02-24 11:00", type: "\u8DDF\u8FDB\u8BB0\u5F55", desc: '\u7535\u8BDD\u62DC\u8BBF\u4E86"\u4E0A\u6D77\u8D38\u6613\u6709\u9650\u8D23\u4EFB\u516C\u53F8"\u7684\u674E\u56DB', operator: "\u738B\u9500\u552E", tagType: "primary" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_row = ElRow;
      const _component_el_col = ElCol;
      const _component_el_card = ElCard;
      const _component_el_icon = ElIcon;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "dashboard-container" }, _attrs))} data-v-0f3cd699><div class="page-header" data-v-0f3cd699><h2 class="page-title" data-v-0f3cd699>\u4EEA\u8868\u76D8</h2></div>`);
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
                        _push4(`</div><div class="stat-info" data-v-0f3cd699${_scopeId3}><div class="stat-title" data-v-0f3cd699${_scopeId3}>\u5BA2\u6237\u603B\u6570</div><div class="stat-value" data-v-0f3cd699${_scopeId3}>156</div></div>`);
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
                            createVNode("div", { class: "stat-title" }, "\u5BA2\u6237\u603B\u6570"),
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
                          createVNode("div", { class: "stat-title" }, "\u5BA2\u6237\u603B\u6570"),
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
                        _push4(`</div><div class="stat-info" data-v-0f3cd699${_scopeId3}><div class="stat-title" data-v-0f3cd699${_scopeId3}>\u7EBF\u7D22\u6570</div><div class="stat-value" data-v-0f3cd699${_scopeId3}>89</div></div>`);
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
                            createVNode("div", { class: "stat-title" }, "\u7EBF\u7D22\u6570"),
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
                          createVNode("div", { class: "stat-title" }, "\u7EBF\u7D22\u6570"),
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
                        _push4(`</div><div class="stat-info" data-v-0f3cd699${_scopeId3}><div class="stat-title" data-v-0f3cd699${_scopeId3}>\u5546\u673A\u6570</div><div class="stat-value" data-v-0f3cd699${_scopeId3}>34</div></div>`);
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
                            createVNode("div", { class: "stat-title" }, "\u5546\u673A\u6570"),
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
                          createVNode("div", { class: "stat-title" }, "\u5546\u673A\u6570"),
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
                        _push4(`</div><div class="stat-info" data-v-0f3cd699${_scopeId3}><div class="stat-title" data-v-0f3cd699${_scopeId3}>\u672C\u6708\u6210\u4EA4</div><div class="stat-value" data-v-0f3cd699${_scopeId3}>12</div></div>`);
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
                            createVNode("div", { class: "stat-title" }, "\u672C\u6708\u6210\u4EA4"),
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
                          createVNode("div", { class: "stat-title" }, "\u672C\u6708\u6210\u4EA4"),
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
                        createVNode("div", { class: "stat-title" }, "\u5BA2\u6237\u603B\u6570"),
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
                        createVNode("div", { class: "stat-title" }, "\u7EBF\u7D22\u6570"),
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
                        createVNode("div", { class: "stat-title" }, "\u5546\u673A\u6570"),
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
                        createVNode("div", { class: "stat-title" }, "\u672C\u6708\u6210\u4EA4"),
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
                  _push3(ssrRenderComponent(_component_el_card, { header: "\u9500\u552E\u8D8B\u52BF" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="chart-placeholder" style="${ssrRenderStyle({ "color": "#409EFF" })}" data-v-0f3cd699${_scopeId3}>\u9500\u552E\u8D8B\u52BF\u56FE\u8868\u5360\u4F4D</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "chart-placeholder",
                            style: { "color": "#409EFF" }
                          }, "\u9500\u552E\u8D8B\u52BF\u56FE\u8868\u5360\u4F4D")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, { header: "\u9500\u552E\u8D8B\u52BF" }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "chart-placeholder",
                          style: { "color": "#409EFF" }
                        }, "\u9500\u552E\u8D8B\u52BF\u56FE\u8868\u5360\u4F4D")
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
                  _push3(ssrRenderComponent(_component_el_card, { header: "\u5BA2\u6237\u5206\u5E03" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="chart-placeholder" style="${ssrRenderStyle({ "color": "#67C23A" })}" data-v-0f3cd699${_scopeId3}>\u5BA2\u6237\u5206\u5E03\u56FE\u8868\u5360\u4F4D</div>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "chart-placeholder",
                            style: { "color": "#67C23A" }
                          }, "\u5BA2\u6237\u5206\u5E03\u56FE\u8868\u5360\u4F4D")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_card, { header: "\u5BA2\u6237\u5206\u5E03" }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "chart-placeholder",
                          style: { "color": "#67C23A" }
                        }, "\u5BA2\u6237\u5206\u5E03\u56FE\u8868\u5360\u4F4D")
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
                  createVNode(_component_el_card, { header: "\u9500\u552E\u8D8B\u52BF" }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "chart-placeholder",
                        style: { "color": "#409EFF" }
                      }, "\u9500\u552E\u8D8B\u52BF\u56FE\u8868\u5360\u4F4D")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_el_col, { span: 12 }, {
                default: withCtx(() => [
                  createVNode(_component_el_card, { header: "\u5BA2\u6237\u5206\u5E03" }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "chart-placeholder",
                        style: { "color": "#67C23A" }
                      }, "\u5BA2\u6237\u5206\u5E03\u56FE\u8868\u5360\u4F4D")
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
        header: "\u6700\u8FD1\u6D3B\u52A8",
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
                    label: "\u65F6\u95F4",
                    width: "180"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "type",
                    label: "\u7C7B\u578B",
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
                    label: "\u63CF\u8FF0"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "operator",
                    label: "\u64CD\u4F5C\u4EBA",
                    width: "120"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_table_column, {
                      prop: "time",
                      label: "\u65F6\u95F4",
                      width: "180"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "type",
                      label: "\u7C7B\u578B",
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
                      label: "\u63CF\u8FF0"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "operator",
                      label: "\u64CD\u4F5C\u4EBA",
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
                    label: "\u65F6\u95F4",
                    width: "180"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "type",
                    label: "\u7C7B\u578B",
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
                    label: "\u63CF\u8FF0"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "operator",
                    label: "\u64CD\u4F5C\u4EBA",
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

export { dashboard as default };
//# sourceMappingURL=dashboard-CoyewQ3G.mjs.map
