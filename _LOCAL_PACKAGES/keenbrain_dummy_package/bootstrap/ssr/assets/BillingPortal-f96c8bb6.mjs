import { mergeProps, useSSRContext, resolveComponent, withCtx, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-cc2b3d55.mjs";
import { router } from "@inertiajs/vue3";
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    class: [_ctx.$page.props.brandColor, "inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none transition ease-in-out duration-150"]
  }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</button>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Button.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const DummyButton = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  components: {
    DummyButton
  },
  props: [
    "balance",
    "invoices",
    "billableId",
    "billableType",
    "plan",
    "seatName",
    "userName"
  ],
  data() {
    return {
      errors: []
    };
  },
  watch: {
    /**
     * Watch the "$page.props.state" variable to reload data during "pending" state.
     */
    "$page.props.state": {
      immediate: true,
      handler: function(newState, oldState) {
        if (newState == "pending") {
          this.startReloadingData();
        }
      }
    }
  },
  /**
   * Initialize the component.
   */
  mounted() {
    router.on("invalid", (event) => {
      event.preventDefault();
      if (event.detail.response.request.responseURL) {
        window.location.href = event.detail.response.request.responseURL;
      } else {
        console.error(event);
      }
    });
  },
  computed: {},
  methods: {
    myDummyButton() {
      alert("myDummyButton");
    },
    /**
     * Make an outgoing request to the Laravel application.
     */
    request(method, url, data = {}) {
      this.errors = [];
      data.billableType = this.billableType;
      data.billableId = this.billableId;
      return axios.request({
        url,
        method,
        data
      }).then((response) => {
        return response;
      }).catch((error) => {
        if (error.response.status == 422) {
          this.errors = _.flatMap(error.response.data.errors);
        } else {
          this.errors = [this.__("An unexpected error occurred and we have notified our support team. Please try again later.")];
        }
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_dummy_button = resolveComponent("dummy-button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-sans antialiased min-h-screen bg-white lg:bg-gray-100" }, _attrs))}><div class="lg:min-h-screen bg flex flex-wrap lg:flex-nowrap"><div class="order-last lg:order-first lg:max-w-md py-10 lg:pt-24 px-6 bg-white lg:shadow-lg" id="sideBar">`);
  if (_ctx.$page.props.appLogo) {
    _push(`<div class="max-w-md">${_ctx.$page.props.appLogo}</div>`);
  } else {
    _push(`<h1 class="text-3xl font-bold text-gray-900">${ssrInterpolate(_ctx.$page.props.appName)}</h1>`);
  }
  _push(`<h2 class="mt-1 text-lg font-semibold text-gray-700">${ssrInterpolate(_ctx.__("Billing Management"))}</h2><div class="flex items-center mt-12 text-gray-600"><div>${ssrInterpolate(_ctx.__("Signed in as"))}</div>`);
  if (_ctx.$page.props.userAvatar) {
    _push(`<img${ssrRenderAttr("src", _ctx.$page.props.userAvatar)} class="ml-2 h-6 w-6 rounded-full">`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="${ssrRenderClass({ "ml-1": !_ctx.$page.props.userAvatar, "ml-2": _ctx.$page.props.userAvatar })}">${ssrInterpolate(_ctx.$page.props.userName)}. </div></div>`);
  if (_ctx.$page.props.billableName) {
    _push(`<div class="mt-3 text-sm text-gray-600">${ssrInterpolate(_ctx.__("Managing billing for :billableName", { billableName: _ctx.$page.props.billableName }))}. </div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="mt-12 text-gray-600">${ssrInterpolate(_ctx.__("Our billing management portal allows you to conveniently manage your subscription plan, payment methods, and download your recent invoices."))}</div>`);
  if (_ctx.$page.props.termsUrl) {
    _push(`<div class="mt-12" id="sideBarTermsLink"><a${ssrRenderAttr("href", _ctx.$page.props.termsUrl)} class="text-gray-600 underline" target="_blank">${ssrInterpolate(_ctx.__("Terms of Service"))}</a></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="mt-12" id="sideBarReturnLink"><a${ssrRenderAttr("href", _ctx.$page.props.dashboardUrl)} class="flex items-center"><svg viewBox="0 0 20 20" fill="currentColor" class="arrow-left w-5 h-5 text-gray-400"><path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg><div class="ml-2 text-gray-600 underline">${ssrInterpolate(_ctx.__("Return to :appName", { appName: _ctx.$page.props.appName }))}</div></a></div></div><div class="w-full lg:flex-1 bg-gray-100"><div class="sm:px-8 pb-10 pt-6 lg:pt-24 lg:pb-24 lg:max-w-4xl lg:mx-auto flex flex-col space-y-10"> Main Content </div></div></div>`);
  _push(ssrRenderComponent(_component_dummy_button, {
    class: "ml-auto",
    onClick: $options.myDummyButton,
    ref: "myDummyButton"
  }, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Dummy Button `);
      } else {
        return [
          createTextVNode(" Dummy Button ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/BillingPortal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const BillingPortal = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  BillingPortal as default
};
