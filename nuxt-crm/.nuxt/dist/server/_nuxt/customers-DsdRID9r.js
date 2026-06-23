import { E as ElInput } from "./el-input-DVYqXNq8.js";
import { E as ElIcon, $ as search_default } from "./base-ntEGVrK7.js";
import { E as ElButton } from "./el-button-K9fBFT48.js";
import { E as ElCard } from "./el-card-Ke6bVVp2.js";
import { E as ElTable, a as ElTableColumn } from "./index-3yF-gldY.js";
import { E as ElTag } from "./index-CFisVmGQ.js";
/* empty css                   */
/* empty css                    */
/* empty css                         */
/* empty css                */
import { defineComponent, ref, computed, mergeProps, isRef, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import "D:/test-code/nuxt-crm/node_modules/hookable/dist/index.mjs";
import { u as useCrmStore } from "./crm-CRdTLHBG.js";
import { _ as _export_sfc } from "../server.mjs";
import "@vueuse/core";
import "@vue/shared";
import "lodash-unified";
import "./typescript-D6L75muK.js";
import "@popperjs/core";
import "@ctrl/tinycolor";
import "normalize-wheel-es";
import "pinia";
import "D:/test-code/nuxt-crm/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/test-code/nuxt-crm/node_modules/unctx/dist/index.mjs";
import "D:/test-code/nuxt-crm/node_modules/h3/dist/index.mjs";
import "D:/test-code/nuxt-crm/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/test-code/nuxt-crm/node_modules/ufo/dist/index.mjs";
import "D:/test-code/nuxt-crm/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "customers",
  __ssrInlineRender: true,
  setup(__props) {
    const crmStore = useCrmStore();
    const searchQuery = ref("");
    const filteredCustomers = computed(() => {
      if (!searchQuery.value) return crmStore.customers;
      return crmStore.customers.filter((c) => c.name.includes(searchQuery.value));
    });
    const getLevelTagType = (level) => {
      const map = {
        "A": "danger",
        "B": "warning",
        "C": "info",
        "D": "primary"
      };
      return map[level] || "info";
    };
    const getStatusTagType = (status) => {
      const map = {
        "active": "success",
        "inactive": "danger",
        "potential": "warning"
      };
      return map[status] || "info";
    };
    const getStatusText = (status) => {
      const map = {
        "active": "活跃",
        "inactive": "流失",
        "potential": "潜在"
      };
      return map[status] || status;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_input = ElInput;
      const _component_el_icon = ElIcon;
      const _component_el_button = ElButton;
      const _component_el_card = ElCard;
      const _component_el_table = ElTable;
      const _component_el_table_column = ElTableColumn;
      const _component_el_tag = ElTag;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "customers-container" }, _attrs))} data-v-d2deb15d><div class="page-header" data-v-d2deb15d><h2 class="page-title" data-v-d2deb15d>客户管理</h2><div class="header-actions" data-v-d2deb15d>`);
      _push(ssrRenderComponent(_component_el_input, {
        modelValue: unref(searchQuery),
        "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
        placeholder: "搜索客户名称",
        style: { "width": "250px", "margin-right": "15px" }
      }, {
        prefix: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_icon, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(search_default), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(search_default))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_icon, null, {
                default: withCtx(() => [
                  createVNode(unref(search_default))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_el_button, { type: "primary" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`新增客户`);
          } else {
            return [
              createTextVNode("新增客户")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_el_card, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_table, {
              data: unref(filteredCustomers),
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
                    label: "客户名称",
                    "min-width": "180"
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
                    prop: "region",
                    label: "地区",
                    width: "100"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_table_column, {
                    prop: "level",
                    label: "级别",
                    width: "100"
                  }, {
                    default: withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_tag, {
                          type: getLevelTagType(row.level)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(row.level)}级`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(row.level) + "级", 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_tag, {
                            type: getLevelTagType(row.level)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(row.level) + "级", 1)
                            ]),
                            _: 2
                          }, 1032, ["type"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
                              _push5(`编辑`);
                            } else {
                              return [
                                createTextVNode("编辑")
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
                              _push5(`删除`);
                            } else {
                              return [
                                createTextVNode("删除")
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
                              createTextVNode("编辑")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_button, {
                            link: "",
                            type: "danger",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("删除")
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
                      label: "客户名称",
                      "min-width": "180"
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
                      prop: "region",
                      label: "地区",
                      width: "100"
                    }),
                    createVNode(_component_el_table_column, {
                      prop: "level",
                      label: "级别",
                      width: "100"
                    }, {
                      default: withCtx(({ row }) => [
                        createVNode(_component_el_tag, {
                          type: getLevelTagType(row.level)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(row.level) + "级", 1)
                          ]),
                          _: 2
                        }, 1032, ["type"])
                      ]),
                      _: 1
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
                            createTextVNode("编辑")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_button, {
                          link: "",
                          type: "danger",
                          size: "small"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("删除")
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
                data: unref(filteredCustomers),
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
                    label: "客户名称",
                    "min-width": "180"
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
                    prop: "region",
                    label: "地区",
                    width: "100"
                  }),
                  createVNode(_component_el_table_column, {
                    prop: "level",
                    label: "级别",
                    width: "100"
                  }, {
                    default: withCtx(({ row }) => [
                      createVNode(_component_el_tag, {
                        type: getLevelTagType(row.level)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(row.level) + "级", 1)
                        ]),
                        _: 2
                      }, 1032, ["type"])
                    ]),
                    _: 1
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
                          createTextVNode("编辑")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_button, {
                        link: "",
                        type: "danger",
                        size: "small"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("删除")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/customers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const customers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d2deb15d"]]);
export {
  customers as default
};
//# sourceMappingURL=customers-DsdRID9r.js.map
