import { E as ElCard } from "./el-card-Ke6bVVp2.js";
import { E as ElForm, a as ElFormItem } from "./el-form-item-DS_c4Xph.js";
import { E as ElInput } from "./el-input-DVYqXNq8.js";
import { i as iconPropType, T as TypeComponentsMap, a as TypeComponents, E as ElButton } from "./el-button-K9fBFT48.js";
import { f as buildProps, d as definePropType, L as addUnit, n as withInstall, M as useEmptyValuesProps, u as useSizeProp, N as provideGlobalConfig, O as useGlobalComponentSettings, E as ElIcon, C as getEventCode, D as EVENT_CODE, P as withInstallFunction } from "./base-ntEGVrK7.js";
import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, unref, renderSlot, createVNode, Transition, withCtx, normalizeStyle, createTextVNode, toDisplayString, createCommentVNode, watch, shallowReactive, ref, createBlock, withDirectives, createElementVNode, resolveDynamicComponent, Fragment, withModifiers, vShow, nextTick, isVNode, render, reactive, mergeProps, withKeys, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { d as useNamespace, f as isNumber, k as isElement, l as debugWarn, g as isBoolean, n as navigateTo, _ as _export_sfc } from "../server.mjs";
import "./index-CFisVmGQ.js";
import "./index-msx-EPVQ.js";
import "./index-3yF-gldY.js";
import { isClient, useEventListener, useResizeObserver, useTimeoutFn } from "@vueuse/core";
import { isString, isFunction, hasOwn } from "@vue/shared";
import "lodash-unified";
import { m as mutable } from "./typescript-D6L75muK.js";
import "dayjs";
import "D:/test-code/nuxt-crm/node_modules/hookable/dist/index.mjs";
import { u as useAuthStore } from "./auth-BOcGrzbx.js";
import "async-validator";
import "@ctrl/tinycolor";
import "@popperjs/core";
import "D:/test-code/nuxt-crm/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/test-code/nuxt-crm/node_modules/unctx/dist/index.mjs";
import "D:/test-code/nuxt-crm/node_modules/h3/dist/index.mjs";
import "pinia";
import "D:/test-code/nuxt-crm/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "D:/test-code/nuxt-crm/node_modules/ufo/dist/index.mjs";
import "D:/test-code/nuxt-crm/node_modules/klona/dist/index.mjs";
import "normalize-wheel-es";
const badgeProps = buildProps({
  /**
  * @description display value.
  */
  value: {
    type: [String, Number],
    default: ""
  },
  /**
  * @description maximum value, shows `{max}+` when exceeded. Only works if value is a number.
  */
  max: {
    type: Number,
    default: 99
  },
  /**
  * @description if a little dot is displayed.
  */
  isDot: Boolean,
  /**
  * @description hidden badge.
  */
  hidden: Boolean,
  /**
  * @description badge type.
  */
  type: {
    type: String,
    values: [
      "primary",
      "success",
      "warning",
      "info",
      "danger"
    ],
    default: "danger"
  },
  /**
  * @description whether to show badge when value is zero.
  */
  showZero: {
    type: Boolean,
    default: true
  },
  /**
  * @description customize dot background color
  */
  color: String,
  /**
  * @description CSS style of badge
  */
  badgeStyle: {
    type: definePropType([
      String,
      Object,
      Array,
      Boolean
    ]),
    default: void 0
  },
  /**
  * @description set offset of the badge
  */
  offset: {
    type: definePropType(Array),
    default: () => [0, 0]
  },
  /**
  * @description custom class name of badge
  */
  badgeClass: { type: String }
});
var badge_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElBadge",
  __name: "badge",
  props: badgeProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("badge");
    const content = computed(() => {
      if (props.isDot) return "";
      if (isNumber(props.value) && isNumber(props.max)) return props.max < props.value ? `${props.max}+` : `${props.value}`;
      return `${props.value}`;
    });
    const style = computed(() => {
      return [{
        backgroundColor: props.color,
        marginRight: addUnit(-props.offset[0]),
        marginTop: addUnit(props.offset[1])
      }, props.badgeStyle ?? {}];
    });
    __expose({
      /** @description badge content */
      content
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", { class: normalizeClass(unref(ns).b()) }, [renderSlot(_ctx.$slots, "default"), createVNode(Transition, { name: `${unref(ns).namespace.value}-zoom-in-center` }, {
        default: withCtx(() => [!__props.hidden && (content.value || __props.isDot || _ctx.$slots.content) ? (openBlock(), createElementBlock("sup", {
          key: 0,
          class: normalizeClass([
            unref(ns).e("content"),
            unref(ns).em("content", __props.type),
            unref(ns).is("fixed", !!_ctx.$slots.default),
            unref(ns).is("dot", __props.isDot),
            unref(ns).is("hide-zero", !__props.showZero && __props.value === 0),
            __props.badgeClass
          ]),
          style: normalizeStyle(style.value)
        }, [renderSlot(_ctx.$slots, "content", { value: content.value }, () => [createTextVNode(toDisplayString(content.value), 1)])], 6)) : createCommentVNode("v-if", true)]),
        _: 3
      }, 8, ["name"])], 2);
    };
  }
});
var badge_default = badge_vue_vue_type_script_setup_true_lang_default;
const ElBadge = withInstall(badge_default);
const configProviderProps = buildProps({
  /**
  * @description Controlling if the users want a11y features
  */
  a11y: {
    type: Boolean,
    default: true
  },
  /**
  * @description Locale Object
  */
  locale: { type: definePropType(Object) },
  /**
  * @description global component size
  */
  size: useSizeProp,
  /**
  * @description button related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#button-attribute)
  */
  button: { type: definePropType(Object) },
  /**
  * @description card related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#card-attribute)
  */
  card: { type: definePropType(Object) },
  /**
  * @description dialog related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#dialog-attribute)
  */
  dialog: { type: definePropType(Object) },
  /**
  * @description link related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#link-attribute)
  */
  link: { type: definePropType(Object) },
  /**
  * @description features at experimental stage to be added, all features are default to be set to false, [see the following table](https://element-plus.org/en-US/component/config-provider.html#experimental-features)                                                                            | ^[object]
  */
  experimentalFeatures: { type: definePropType(Object) },
  /**
  * @description Controls if we should handle keyboard navigation
  */
  keyboardNavigation: {
    type: Boolean,
    default: true
  },
  /**
  * @description message related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#message-attribute)
  */
  message: { type: definePropType(Object) },
  /**
  * @description global Initial zIndex
  */
  zIndex: Number,
  /**
  * @description global component className prefix (cooperated with [$namespace](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/mixins/config.scss#L1)) | ^[string]
  */
  namespace: {
    type: String,
    default: "el"
  },
  /**
  * @description table related configuration, [see the following table](https://element-plus.org/en-US/component/config-provider.html#table-attribute)
  */
  table: { type: definePropType(Object) },
  ...useEmptyValuesProps
});
const messageConfig = { placement: "top" };
const ConfigProvider = defineComponent({
  name: "ElConfigProvider",
  props: configProviderProps,
  setup(props, { slots }) {
    const config = provideGlobalConfig(props);
    watch(() => props.message, (val) => {
      Object.assign(messageConfig, config?.value?.message ?? {}, val ?? {});
    }, {
      immediate: true,
      deep: true
    });
    return () => renderSlot(slots, "default", { config: config?.value });
  }
});
const messageTypes = [
  "primary",
  "success",
  "info",
  "warning",
  "error"
];
const messagePlacement = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right"
];
const messageDefaults = mutable({
  customClass: "",
  dangerouslyUseHTMLString: false,
  duration: 3e3,
  icon: void 0,
  id: "",
  message: "",
  onClose: void 0,
  showClose: false,
  type: "info",
  plain: false,
  offset: 16,
  placement: void 0,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? (void 0).body : void 0
});
const messageProps = buildProps({
  /**
  * @description custom class name for Message
  */
  customClass: {
    type: String,
    default: messageDefaults.customClass
  },
  /**
  * @description whether `message` is treated as HTML string
  */
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString
  },
  /**
  * @description display duration, millisecond. If set to 0, it will not turn off automatically
  */
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  /**
  * @description custom icon component, overrides `type`
  */
  icon: {
    type: iconPropType,
    default: messageDefaults.icon
  },
  /**
  * @description message dom id
  */
  id: {
    type: String,
    default: messageDefaults.id
  },
  /**
  * @description message text
  */
  message: {
    type: definePropType([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  },
  /**
  * @description callback function when closed with the message instance as the parameter
  */
  onClose: {
    type: definePropType(Function),
    default: messageDefaults.onClose
  },
  /**
  * @description whether to show a close button
  */
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose
  },
  /**
  * @description message type
  */
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type
  },
  /**
  * @description whether message is plain
  */
  plain: {
    type: Boolean,
    default: messageDefaults.plain
  },
  /**
  * @description set the distance to the top of viewport
  */
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  /**
  * @description message placement position
  */
  placement: {
    type: String,
    values: messagePlacement,
    default: messageDefaults.placement
  },
  /**
  * @description message element zIndex value
  */
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex
  },
  /**
  * @description merge messages with the same content, type of VNode message is not supported
  */
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping
  },
  /**
  * @description The number of repetitions, similar to badge, is used as the initial number when used with `grouping`
  */
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum
  }
});
const messageEmits = { destroy: () => true };
const placementInstances = shallowReactive({});
const getOrCreatePlacementInstances = (placement) => {
  if (!placementInstances[placement]) placementInstances[placement] = shallowReactive([]);
  return placementInstances[placement];
};
const getInstance = (id, placement) => {
  const instances = placementInstances[placement] || [];
  const idx = instances.findIndex((instance) => instance.id === id);
  const current = instances[idx];
  let prev;
  if (idx > 0) prev = instances[idx - 1];
  return {
    current,
    prev
  };
};
const getLastOffset = (id, placement) => {
  const { prev } = getInstance(id, placement);
  if (!prev) return 0;
  return prev.vm.exposed.bottom.value;
};
const getOffsetOrSpace = (id, offset, placement) => {
  return (placementInstances[placement] || []).findIndex((instance) => instance.id === id) > 0 ? 16 : offset;
};
const _hoisted_1 = ["id"];
const _hoisted_2 = ["innerHTML"];
var message_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "ElMessage",
  __name: "message",
  props: messageProps,
  emits: messageEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const { Close } = TypeComponents;
    const props = __props;
    const emit = __emit;
    const isStartTransition = ref(false);
    const { ns, zIndex } = useGlobalComponentSettings("message");
    const { currentZIndex, nextZIndex } = zIndex;
    const messageRef = ref();
    const visible = ref(false);
    const height = ref(0);
    let stopTimer = void 0;
    const badgeType = computed(() => props.type ? props.type === "error" ? "danger" : props.type : "info");
    const typeClass = computed(() => {
      const type = props.type;
      return { [ns.bm("icon", type)]: type && TypeComponentsMap[type] };
    });
    const iconComponent = computed(() => props.icon || TypeComponentsMap[props.type] || "");
    const placement = computed(() => props.placement || "top");
    const lastOffset = computed(() => getLastOffset(props.id, placement.value));
    const offset = computed(() => {
      return Math.max(getOffsetOrSpace(props.id, props.offset, placement.value) + lastOffset.value, props.offset);
    });
    const bottom = computed(() => height.value + offset.value);
    const horizontalClass = computed(() => {
      if (placement.value.includes("left")) return ns.is("left");
      if (placement.value.includes("right")) return ns.is("right");
      return ns.is("center");
    });
    const verticalProperty = computed(() => placement.value.startsWith("top") ? "top" : "bottom");
    const customStyle = computed(() => ({
      [verticalProperty.value]: `${offset.value}px`,
      zIndex: currentZIndex.value
    }));
    function startTimer() {
      if (props.duration === 0) return;
      ({ stop: stopTimer } = useTimeoutFn(() => {
        close();
      }, props.duration));
    }
    function clearTimer() {
      stopTimer?.();
    }
    function close() {
      visible.value = false;
      nextTick(() => {
        if (!isStartTransition.value) {
          props.onClose?.();
          emit("destroy");
        }
      });
    }
    function keydown(event) {
      if (getEventCode(event) === EVENT_CODE.esc) close();
    }
    watch(() => props.repeatNum, () => {
      clearTimer();
      startTimer();
    });
    useEventListener(void 0, "keydown", keydown);
    useResizeObserver(messageRef, () => {
      height.value = messageRef.value.getBoundingClientRect().height;
    });
    __expose({
      visible,
      bottom,
      close
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: unref(ns).b("fade"),
        onBeforeEnter: _cache[0] || (_cache[0] = ($event) => isStartTransition.value = true),
        onBeforeLeave: __props.onClose,
        onAfterLeave: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("destroy")),
        persisted: ""
      }, {
        default: withCtx(() => [withDirectives(createElementVNode("div", {
          id: __props.id,
          ref_key: "messageRef",
          ref: messageRef,
          class: normalizeClass([
            unref(ns).b(),
            { [unref(ns).m(__props.type)]: __props.type },
            unref(ns).is("closable", __props.showClose),
            unref(ns).is("plain", __props.plain),
            unref(ns).is("bottom", verticalProperty.value === "bottom"),
            horizontalClass.value,
            __props.customClass
          ]),
          style: normalizeStyle(customStyle.value),
          role: "alert",
          onMouseenter: clearTimer,
          onMouseleave: startTimer
        }, [
          __props.repeatNum > 1 ? (openBlock(), createBlock(unref(ElBadge), {
            key: 0,
            value: __props.repeatNum,
            type: badgeType.value,
            class: normalizeClass(unref(ns).e("badge"))
          }, null, 8, [
            "value",
            "type",
            "class"
          ])) : createCommentVNode("v-if", true),
          iconComponent.value ? (openBlock(), createBlock(unref(ElIcon), {
            key: 1,
            class: normalizeClass([unref(ns).e("icon"), typeClass.value])
          }, {
            default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(iconComponent.value)))]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", true),
          !__props.dangerouslyUseHTMLString || _ctx.$slots.default ? (openBlock(), createElementBlock("p", {
            key: 2,
            class: normalizeClass(unref(ns).e("content"))
          }, [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(__props.message), 1)])], 2)) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "), createElementVNode("p", {
            class: normalizeClass(unref(ns).e("content")),
            innerHTML: __props.message
          }, null, 10, _hoisted_2)], 2112)),
          __props.showClose ? (openBlock(), createBlock(unref(ElIcon), {
            key: 4,
            class: normalizeClass(unref(ns).e("closeBtn")),
            onClick: withModifiers(close, ["stop"])
          }, {
            default: withCtx(() => [createVNode(unref(Close))]),
            _: 1
          }, 8, ["class"])) : createCommentVNode("v-if", true)
        ], 46, _hoisted_1), [[vShow, visible.value]])]),
        _: 3
      }, 8, ["name", "onBeforeLeave"]);
    };
  }
});
var message_default = message_vue_vue_type_script_setup_true_lang_default;
let seed = 1;
const normalizeAppendTo = (normalized) => {
  if (!normalized.appendTo) normalized.appendTo = (void 0).body;
  else if (isString(normalized.appendTo)) {
    let appendTo = (void 0).querySelector(normalized.appendTo);
    if (!isElement(appendTo)) {
      debugWarn("ElMessage", "the appendTo option is not an HTMLElement. Falling back to document.body.");
      appendTo = (void 0).body;
    }
    normalized.appendTo = appendTo;
  }
};
const normalizePlacement = (normalized) => {
  if (!normalized.placement && isString(messageConfig.placement) && messageConfig.placement) normalized.placement = messageConfig.placement;
  if (!normalized.placement) normalized.placement = "top";
  if (!messagePlacement.includes(normalized.placement)) {
    debugWarn("ElMessage", `Invalid placement: ${normalized.placement}. Falling back to 'top'.`);
    normalized.placement = "top";
  }
};
const normalizeOptions = (params) => {
  const options = !params || isString(params) || isVNode(params) || isFunction(params) ? { message: params } : params;
  const normalized = {
    ...messageDefaults,
    ...options
  };
  normalizeAppendTo(normalized);
  normalizePlacement(normalized);
  if (isBoolean(messageConfig.grouping) && !normalized.grouping) normalized.grouping = messageConfig.grouping;
  if (isNumber(messageConfig.duration) && normalized.duration === 3e3) normalized.duration = messageConfig.duration;
  if (isNumber(messageConfig.offset) && normalized.offset === 16) normalized.offset = messageConfig.offset;
  if (isBoolean(messageConfig.showClose) && !normalized.showClose) normalized.showClose = messageConfig.showClose;
  if (isBoolean(messageConfig.plain) && !normalized.plain) normalized.plain = messageConfig.plain;
  return normalized;
};
const closeMessage = (instance) => {
  const instances = placementInstances[instance.props.placement || "top"];
  const idx = instances.indexOf(instance);
  if (idx === -1) return;
  instances.splice(idx, 1);
  const { handler } = instance;
  handler.close();
};
const createMessage = ({ appendTo, ...options }, context) => {
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const container = (void 0).createElement("div");
  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose?.();
      closeMessage(instance);
    },
    onDestroy: () => {
      render(null, container);
    }
  };
  const vnode = createVNode(message_default, props, isFunction(props.message) || isVNode(props.message) ? { default: isFunction(props.message) ? props.message : () => props.message } : null);
  vnode.appContext = context || message._context;
  render(vnode, container);
  appendTo.appendChild(container.firstElementChild);
  const vm = vnode.component;
  const instance = {
    id,
    vnode,
    vm,
    handler: { close: () => {
      vm.exposed.close();
    } },
    props: vnode.component.props
  };
  return instance;
};
const message = (options = {}, context) => {
  if (!isClient) return { close: () => void 0 };
  const normalized = normalizeOptions(options);
  const instances = getOrCreatePlacementInstances(normalized.placement || "top");
  if (normalized.grouping && instances.length) {
    const instance2 = instances.find(({ vnode: vm }) => vm.props?.message === normalized.message);
    if (instance2) {
      instance2.props.repeatNum += 1;
      instance2.props.type = normalized.type;
      return instance2.handler;
    }
  }
  if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) return { close: () => void 0 };
  const instance = createMessage(normalized, context);
  instances.push(instance);
  return instance.handler;
};
messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    return message({
      ...normalizeOptions(options),
      type
    }, appContext);
  };
});
function closeAll(type) {
  for (const placement in placementInstances) if (hasOwn(placementInstances, placement)) {
    const instances = [...placementInstances[placement]];
    for (const instance of instances) if (!type || type === instance.props.type) instance.handler.close();
  }
}
function closeAllByPlacement(placement) {
  if (!placementInstances[placement]) return;
  [...placementInstances[placement]].forEach((instance) => instance.handler.close());
}
message.closeAll = closeAll;
message.closeAllByPlacement = closeAllByPlacement;
message._context = null;
const ElMessage = withInstallFunction(message, "$message");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const loginForm = reactive({ username: "admin", password: "123456" });
    const loading = ref(false);
    const handleLogin = () => {
      loading.value = true;
      setTimeout(() => {
        const success = authStore.login(loginForm.username, loginForm.password);
        loading.value = false;
        if (success) {
          ElMessage.success("登录成功");
          navigateTo("/dashboard");
        } else {
          ElMessage.error("用户名或密码不能为空");
        }
      }, 500);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_card = ElCard;
      const _component_el_form = ElForm;
      const _component_el_form_item = ElFormItem;
      const _component_el_input = ElInput;
      const _component_el_button = ElButton;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "login-container" }, _attrs))} data-v-9a01b992>`);
      _push(ssrRenderComponent(_component_el_card, { class: "login-card" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="login-title" data-v-9a01b992${_scopeId}>CRM 管理系统</h2>`);
            _push2(ssrRenderComponent(_component_el_form, {
              model: unref(loginForm),
              "label-position": "top"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "用户名" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(loginForm).username,
                          "onUpdate:modelValue": ($event) => unref(loginForm).username = $event,
                          placeholder: "请输入用户名"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(loginForm).username,
                            "onUpdate:modelValue": ($event) => unref(loginForm).username = $event,
                            placeholder: "请输入用户名"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, { label: "密码" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_input, {
                          modelValue: unref(loginForm).password,
                          "onUpdate:modelValue": ($event) => unref(loginForm).password = $event,
                          type: "password",
                          placeholder: "请输入密码",
                          "show-password": "",
                          onKeyup: handleLogin
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_input, {
                            modelValue: unref(loginForm).password,
                            "onUpdate:modelValue": ($event) => unref(loginForm).password = $event,
                            type: "password",
                            placeholder: "请输入密码",
                            "show-password": "",
                            onKeyup: withKeys(handleLogin, ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_form_item, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_button, {
                          type: "primary",
                          class: "login-btn",
                          onClick: handleLogin,
                          loading: unref(loading)
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`登录`);
                            } else {
                              return [
                                createTextVNode("登录")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_button, {
                            type: "primary",
                            class: "login-btn",
                            onClick: handleLogin,
                            loading: unref(loading)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("登录")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_form_item, { label: "用户名" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(loginForm).username,
                          "onUpdate:modelValue": ($event) => unref(loginForm).username = $event,
                          placeholder: "请输入用户名"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, { label: "密码" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_input, {
                          modelValue: unref(loginForm).password,
                          "onUpdate:modelValue": ($event) => unref(loginForm).password = $event,
                          type: "password",
                          placeholder: "请输入密码",
                          "show-password": "",
                          onKeyup: withKeys(handleLogin, ["enter"])
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_form_item, null, {
                      default: withCtx(() => [
                        createVNode(_component_el_button, {
                          type: "primary",
                          class: "login-btn",
                          onClick: handleLogin,
                          loading: unref(loading)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("登录")
                          ]),
                          _: 1
                        }, 8, ["loading"])
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
              createVNode("h2", { class: "login-title" }, "CRM 管理系统"),
              createVNode(_component_el_form, {
                model: unref(loginForm),
                "label-position": "top"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_form_item, { label: "用户名" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(loginForm).username,
                        "onUpdate:modelValue": ($event) => unref(loginForm).username = $event,
                        placeholder: "请输入用户名"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, { label: "密码" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_input, {
                        modelValue: unref(loginForm).password,
                        "onUpdate:modelValue": ($event) => unref(loginForm).password = $event,
                        type: "password",
                        placeholder: "请输入密码",
                        "show-password": "",
                        onKeyup: withKeys(handleLogin, ["enter"])
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_form_item, null, {
                    default: withCtx(() => [
                      createVNode(_component_el_button, {
                        type: "primary",
                        class: "login-btn",
                        onClick: handleLogin,
                        loading: unref(loading)
                      }, {
                        default: withCtx(() => [
                          createTextVNode("登录")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9a01b992"]]);
export {
  login as default
};
//# sourceMappingURL=login-CmIEH7oc.js.map
