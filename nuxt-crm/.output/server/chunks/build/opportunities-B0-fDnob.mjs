import { E as ElButton } from './el-button-K9fBFT48.mjs';
import { E as ElCard } from './el-card-Ke6bVVp2.mjs';
import { E as ElTable, a as ElTableColumn } from './index-3yF-gldY.mjs';
import { E as ElTag } from './index-CFisVmGQ.mjs';
import { a as withInstall, N as warning_filled_default, O as circle_check_default, o as circle_close_default, P as check_default, Q as close_default, E as ElIcon, b as buildProps, d as definePropType } from './base-ntEGVrK7.mjs';
import { isFunction, isString } from '@vue/shared';
import { d as useNamespace } from './server.mjs';
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, normalizeStyle, renderSlot, toDisplayString, createCommentVNode, createBlock, withCtx, resolveDynamicComponent, mergeProps, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useCrmStore } from './crm-CRdTLHBG.mjs';
import '@ctrl/tinycolor';
import '@vueuse/core';
import 'normalize-wheel-es';
import 'lodash-unified';
import '@popperjs/core';
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

const progressProps = buildProps({
  /**
  * @description type of progress bar
  */
  type: {
    type: String,
    default: "line",
    values: [
      "line",
      "circle",
      "dashboard"
    ]
  },
  /**
  * @description percentage, required
  */
  percentage: {
    type: Number,
    default: 0,
    validator: (val) => val >= 0 && val <= 100
  },
  /**
  * @description the current status of progress bar
  */
  status: {
    type: String,
    default: "",
    values: [
      "",
      "success",
      "exception",
      "warning"
    ]
  },
  /**
  * @description set indeterminate progress
  */
  indeterminate: Boolean,
  /**
  * @description control the animation duration of indeterminate progress or striped flow progress
  */
  duration: {
    type: Number,
    default: 3
  },
  /**
  * @description the width of progress bar
  */
  strokeWidth: {
    type: Number,
    default: 6
  },
  /**
  * @description butt/circle/dashboard type shape at the end path
  */
  strokeLinecap: {
    type: definePropType(String),
    default: "round"
  },
  /**
  * @description whether to place the percentage inside progress bar, only works when `type` is 'line'
  */
  textInside: Boolean,
  /**
  * @description the canvas width of circle progress bar
  */
  width: {
    type: Number,
    default: 126
  },
  /**
  * @description whether to show percentage
  */
  showText: {
    type: Boolean,
    default: true
  },
  /**
  * @description background color of progress bar. Overrides `status` prop
  */
  color: {
    type: definePropType([
      String,
      Array,
      Function
    ]),
    default: ""
  },
  /**
  * @description stripe over the progress bar's color
  */
  striped: Boolean,
  /**
  * @description get the stripes to flow
  */
  stripedFlow: Boolean,
  /**
  * @description custom text format
  */
  format: {
    type: definePropType(Function),
    default: (percentage) => `${percentage}%`
  }
});
const _hoisted_1 = ["aria-valuenow"];
const _hoisted_2 = { viewBox: "0 0 100 100" };
const _hoisted_3 = [
  "d",
  "stroke",
  "stroke-linecap",
  "stroke-width"
];
const _hoisted_4 = [
  "d",
  "stroke",
  "opacity",
  "stroke-linecap",
  "stroke-width"
];
const _hoisted_5 = { key: 0 };
var progress_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElProgress",
  __name: "progress",
  props: progressProps,
  setup(__props) {
    const STATUS_COLOR_MAP = {
      success: "#13ce66",
      exception: "#ff4949",
      warning: "#e6a23c",
      default: "#20a0ff"
    };
    const props = __props;
    const ns = useNamespace("progress");
    const barStyle = computed(() => {
      const barStyle2 = {
        width: `${props.percentage}%`,
        animationDuration: `${props.duration}s`
      };
      const color = getCurrentColor(props.percentage);
      if (color.includes("gradient")) barStyle2.background = color;
      else barStyle2.backgroundColor = color;
      return barStyle2;
    });
    const relativeStrokeWidth = computed(() => (props.strokeWidth / props.width * 100).toFixed(1));
    const radius = computed(() => {
      if (["circle", "dashboard"].includes(props.type)) return Number.parseInt(`${50 - Number.parseFloat(relativeStrokeWidth.value) / 2}`, 10);
      return 0;
    });
    const trackPath = computed(() => {
      const r = radius.value;
      const isDashboard = props.type === "dashboard";
      return `
          M 50 50
          m 0 ${isDashboard ? "" : "-"}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "-" : ""}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? "" : "-"}${r * 2}
          `;
    });
    const perimeter = computed(() => 2 * Math.PI * radius.value);
    const rate = computed(() => props.type === "dashboard" ? 0.75 : 1);
    const strokeDashoffset = computed(() => {
      return `${ -1 * perimeter.value * (1 - rate.value) / 2}px`;
    });
    const trailPathStyle = computed(() => ({
      strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value
    }));
    const circlePathStyle = computed(() => ({
      strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashoffset.value,
      transition: "stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s"
    }));
    const stroke = computed(() => {
      let ret;
      if (props.color) ret = getCurrentColor(props.percentage);
      else ret = STATUS_COLOR_MAP[props.status] || STATUS_COLOR_MAP.default;
      return ret;
    });
    const statusIcon = computed(() => {
      if (props.status === "warning") return warning_filled_default;
      if (props.type === "line") return props.status === "success" ? circle_check_default : circle_close_default;
      else return props.status === "success" ? check_default : close_default;
    });
    const progressTextSize = computed(() => {
      return props.type === "line" ? 12 + props.strokeWidth * 0.4 : props.width * 0.111111 + 2;
    });
    const content = computed(() => props.format(props.percentage));
    function getColors(color) {
      const span = 100 / color.length;
      return color.map((seriesColor, index) => {
        if (isString(seriesColor)) return {
          color: seriesColor,
          percentage: (index + 1) * span
        };
        return seriesColor;
      }).sort((a, b) => a.percentage - b.percentage);
    }
    const getCurrentColor = (percentage) => {
      var _a;
      const { color } = props;
      if (isFunction(color)) return color(percentage);
      else if (isString(color)) return color;
      else {
        const colors = getColors(color);
        for (const color2 of colors) if (color2.percentage > percentage) return color2.color;
        return (_a = colors[colors.length - 1]) == null ? void 0 : _a.color;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).m(__props.type),
          unref(ns).is(__props.status),
          {
            [unref(ns).m("without-text")]: !__props.showText,
            [unref(ns).m("text-inside")]: __props.textInside
          }
        ]),
        role: "progressbar",
        "aria-valuenow": __props.percentage,
        "aria-valuemin": "0",
        "aria-valuemax": "100"
      }, [__props.type === "line" ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(unref(ns).b("bar"))
      }, [createElementVNode("div", {
        class: normalizeClass(unref(ns).be("bar", "outer")),
        style: normalizeStyle({ height: `${__props.strokeWidth}px` })
      }, [createElementVNode("div", {
        class: normalizeClass([
          unref(ns).be("bar", "inner"),
          { [unref(ns).bem("bar", "inner", "indeterminate")]: __props.indeterminate },
          { [unref(ns).bem("bar", "inner", "striped")]: __props.striped },
          { [unref(ns).bem("bar", "inner", "striped-flow")]: __props.stripedFlow }
        ]),
        style: normalizeStyle(barStyle.value)
      }, [(__props.showText || _ctx.$slots.default) && __props.textInside ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(unref(ns).be("bar", "innerText"))
      }, [renderSlot(_ctx.$slots, "default", { percentage: __props.percentage }, () => [createElementVNode("span", null, toDisplayString(content.value), 1)])], 2)) : createCommentVNode("v-if", true)], 6)], 6)], 2)) : (openBlock(), createElementBlock("div", {
        key: 1,
        class: normalizeClass(unref(ns).b("circle")),
        style: normalizeStyle({
          height: `${__props.width}px`,
          width: `${__props.width}px`
        })
      }, [(openBlock(), createElementBlock("svg", _hoisted_2, [createElementVNode("path", {
        class: normalizeClass(unref(ns).be("circle", "track")),
        d: trackPath.value,
        stroke: `var(${unref(ns).cssVarName("fill-color-light")}, #e5e9f2)`,
        "stroke-linecap": __props.strokeLinecap,
        "stroke-width": relativeStrokeWidth.value,
        fill: "none",
        style: normalizeStyle(trailPathStyle.value)
      }, null, 14, _hoisted_3), createElementVNode("path", {
        class: normalizeClass(unref(ns).be("circle", "path")),
        d: trackPath.value,
        stroke: stroke.value,
        fill: "none",
        opacity: __props.percentage ? 1 : 0,
        "stroke-linecap": __props.strokeLinecap,
        "stroke-width": relativeStrokeWidth.value,
        style: normalizeStyle(circlePathStyle.value)
      }, null, 14, _hoisted_4)]))], 6)), (__props.showText || _ctx.$slots.default) && !__props.textInside ? (openBlock(), createElementBlock("div", {
        key: 2,
        class: normalizeClass(unref(ns).e("text")),
        style: normalizeStyle({ fontSize: `${progressTextSize.value}px` })
      }, [renderSlot(_ctx.$slots, "default", { percentage: __props.percentage }, () => [!__props.status ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(content.value), 1)) : (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
        default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(statusIcon.value)))]),
        _: 1
      }))])], 6)) : createCommentVNode("v-if", true)], 10, _hoisted_1);
    };
  }
});
var progress_default = progress_vue_vue_type_script_setup_true_lang_default;
const ElProgress = withInstall(progress_default);

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
        "prospecting": "\u521D\u671F\u6C9F\u901A",
        "qualification": "\u7ACB\u9879\u8BC4\u4F30",
        "proposal": "\u65B9\u6848\u62A5\u4EF7",
        "negotiation": "\u5546\u52A1\u8C08\u5224",
        "closed_won": "\u8D62\u5355",
        "closed_lost": "\u8F93\u5355"
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "opportunities-container" }, _attrs))}><div class="page-header"><h2 class="page-title">\u5546\u673A\u7BA1\u7406</h2>`);
      _push(ssrRenderComponent(_component_el_button, { type: "primary" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u65B0\u5EFA\u5546\u673A`);
          } else {
            return [
              createTextVNode("\u65B0\u5EFA\u5546\u673A")
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
                    label: "\u5E8F\u53F7",
                    width: "80"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "name",
                    label: "\u5546\u673A\u540D\u79F0",
                    "min-width": "180"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "customer",
                    label: "\u5BA2\u6237",
                    "min-width": "180"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "amount",
                    label: "\u91D1\u989D",
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
                    label: "\u9636\u6BB5",
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
                    label: "\u8D62\u5355\u6982\u7387",
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
                    label: "\u8D1F\u8D23\u4EBA",
                    width: "120"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "expectedCloseDate",
                    label: "\u9884\u8BA1\u5173\u95ED\u65E5\u671F",
                    width: "150"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    label: "\u64CD\u4F5C",
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
                              _push5(`\u67E5\u770B`);
                            } else {
                              return [
                                createTextVNode("\u67E5\u770B")
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
                              _push5(`\u63A8\u8FDB`);
                            } else {
                              return [
                                createTextVNode("\u63A8\u8FDB")
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
                              createTextVNode("\u67E5\u770B")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_button, {
                            link: "",
                            type: "primary",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("\u63A8\u8FDB")
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
                      label: "\u5546\u673A\u540D\u79F0",
                      "min-width": "180"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "customer",
                      label: "\u5BA2\u6237",
                      "min-width": "180"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "amount",
                      label: "\u91D1\u989D",
                      width: "120"
                    }, {
                      default: withCtx(({ row }) => [
                        createTextVNode(toDisplayString(formatAmount(row.amount)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "stage",
                      label: "\u9636\u6BB5",
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
                      label: "\u8D62\u5355\u6982\u7387",
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
                      label: "\u8D1F\u8D23\u4EBA",
                      width: "120"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "expectedCloseDate",
                      label: "\u9884\u8BA1\u5173\u95ED\u65E5\u671F",
                      width: "150"
                    }),
                    createVNode(_component_el_table_column, {
                      label: "\u64CD\u4F5C",
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
                            createTextVNode("\u67E5\u770B")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_button, {
                          link: "",
                          type: "primary",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("\u63A8\u8FDB")
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
                    label: "\u5E8F\u53F7",
                    width: "80"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "name",
                    label: "\u5546\u673A\u540D\u79F0",
                    "min-width": "180"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "customer",
                    label: "\u5BA2\u6237",
                    "min-width": "180"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "amount",
                    label: "\u91D1\u989D",
                    width: "120"
                  }, {
                    default: withCtx(({ row }) => [
                      createTextVNode(toDisplayString(formatAmount(row.amount)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "stage",
                    label: "\u9636\u6BB5",
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
                    label: "\u8D62\u5355\u6982\u7387",
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
                    label: "\u8D1F\u8D23\u4EBA",
                    width: "120"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "expectedCloseDate",
                    label: "\u9884\u8BA1\u5173\u95ED\u65E5\u671F",
                    width: "150"
                  }),
                  createVNode(_component_el_table_column, {
                    label: "\u64CD\u4F5C",
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
                          createTextVNode("\u67E5\u770B")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_button, {
                        link: "",
                        type: "primary",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("\u63A8\u8FDB")
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

export { _sfc_main as default };
//# sourceMappingURL=opportunities-B0-fDnob.mjs.map
