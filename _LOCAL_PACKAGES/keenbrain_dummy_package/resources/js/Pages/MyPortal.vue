<template>
    <div class="font-sans antialiased min-h-screen bg-white lg:bg-gray-300">
        <div class="lg:min-h-screen bg flex flex-wrap lg:flex-nowrap">

            <div class="order-last lg:order-first lg:max-w-md py-10 lg:pt-24 px-6 bg-white lg:shadow-lg" id="sideBar">
                <div class="max-w-md" v-if="$page.props.appLogo" v-html="$page.props.appLogo">
                </div>

                <h1 class="text-3xl font-bold text-gray-900" v-else>
                    {{ $page.props.appName }}
                </h1>

                <h2 class="mt-1 text-lg font-semibold text-gray-700">
                    Management Portal
                </h2>

                <div class="flex items-center mt-12 text-gray-600">
                    <div>
                        Signed in as
                    </div>

                    <img :src="$page.props.userAvatar" class="ml-2 h-6 w-6 rounded-full" v-if="$page.props.userAvatar"/>

                    <div :class="{'ml-1': ! $page.props.userAvatar, 'ml-2': $page.props.userAvatar}">
                        {{ $page.props.userName }}.
                    </div>
                </div>


                <div class="mt-12 text-gray-600">
                    Our management portal allows you to conveniently manage everything.
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
        }
    },
}
</script>
