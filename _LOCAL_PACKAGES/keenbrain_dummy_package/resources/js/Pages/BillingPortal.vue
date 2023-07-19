<template>
    <div class="font-sans antialiased min-h-screen bg-white lg:bg-gray-100">
        <div class="lg:min-h-screen bg flex flex-wrap lg:flex-nowrap">
            <!-- Static Desktop Sidebar -->
            <div class="order-last lg:order-first lg:max-w-md py-10 lg:pt-24 px-6 bg-white lg:shadow-lg" id="sideBar">
                <div class="max-w-md" v-if="$page.props.appLogo" v-html="$page.props.appLogo">
                </div>

                <h1 class="text-3xl font-bold text-gray-900" v-else>
                    {{ $page.props.appName }}
                </h1>

                <h2 class="mt-1 text-lg font-semibold text-gray-700">
                    {{ __('Billing Management') }}
                </h2>

                <div class="flex items-center mt-12 text-gray-600">
                    <div>
                        {{ __('Signed in as') }}
                    </div>

                    <img :src="$page.props.userAvatar" class="ml-2 h-6 w-6 rounded-full" v-if="$page.props.userAvatar"/>

                    <div :class="{'ml-1': ! $page.props.userAvatar, 'ml-2': $page.props.userAvatar}">
                        {{ $page.props.userName }}.
                    </div>
                </div>

                <div class="mt-3 text-sm text-gray-600" v-if="$page.props.billableName">
                    {{ __('Managing billing for :billableName', {billableName: $page.props.billableName}) }}.
                </div>

                <div class="mt-12 text-gray-600">
                    {{ __('Our billing management portal allows you to conveniently manage your subscription plan, payment methods, and download your recent invoices.') }}
                </div>

                <div class="mt-12" id="sideBarTermsLink" v-if="$page.props.termsUrl">
                    <a :href="$page.props.termsUrl" class="text-gray-600 underline" target="_blank">
                        {{ __('Terms of Service') }}
                    </a>
                </div>

                <div class="mt-12" id="sideBarReturnLink">
                    <a :href="$page.props.dashboardUrl" class="flex items-center">
                        <svg viewBox="0 0 20 20" fill="currentColor" class="arrow-left w-5 h-5 text-gray-400">
                            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                        </svg>

                        <div class="ml-2 text-gray-600 underline">
                            {{ __('Return to :appName', {appName: $page.props.appName}) }}
                        </div>
                    </a>
                </div>
            </div>

            <div class="w-full lg:flex-1 bg-gray-100">
                <!-- Main Content -->
                <div class="sm:px-8 pb-10 pt-6 lg:pt-24 lg:pb-24 lg:max-w-4xl lg:mx-auto flex flex-col space-y-10">
                    Main Content
                </div>
            </div>

        </div>

        <dummy-button class="ml-auto" @click.native="myDummyButton" ref="myDummyButton">
            Dummy Button
        </dummy-button>
    </div>
</template>

<script>
import DummyButton from './../Components/Button.vue';
import {router} from '@inertiajs/vue3';

export default {
    components: {
        DummyButton
    },

    props: [
        'balance',
        'invoices',

        'billableId',
        'billableType',
        'plan',
        'seatName',
        'userName',
    ],

    data() {
        return {
            errors: [],
        };
    },

    watch: {
        /**
         * Watch the "$page.props.state" variable to reload data during "pending" state.
         */
        '$page.props.state': {
            immediate: true,
            handler: function (newState, oldState) {
                if (newState == 'pending') {
                    this.startReloadingData();
                }
            }
        },
    },

    /**
     * Initialize the component.
     */
    mounted() {
        router.on('invalid', (event) => {
            event.preventDefault();

            if (event.detail.response.request.responseURL) {
                window.location.href = event.detail.response.request.responseURL;
            } else {
                console.error(event);
            }
        });
    },

    computed: {
    },

    methods: {
        myDummyButton() {
            alert('myDummyButton');
        },

        /**
         * Make an outgoing request to the Laravel application.
         */
        request(method, url, data = {}) {
            this.errors = [];

            data.billableType = this.billableType;
            data.billableId = this.billableId;

            return axios.request({
                url: url,
                method: method,
                data: data,
            }).then(response => {
                return response;
            }).catch(error => {
                if (error.response.status == 422) {
                    this.errors = _.flatMap(error.response.data.errors)
                } else {
                    this.errors = [this.__('An unexpected error occurred and we have notified our support team. Please try again later.')]
                }

                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            });
        },

    },
}
</script>
