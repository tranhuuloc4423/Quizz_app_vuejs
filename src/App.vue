<template>
    <v-app>
        <v-card>
            <v-layout>
                <v-app-bar color="primary" prominent>
                    <v-app-bar-nav-icon
                        variant="text"
                        @click.stop="drawer = !drawer"
                    ></v-app-bar-nav-icon>

                    <v-toolbar-title>My files</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <template v-if="$vuetify.display.mdAndUp">
                        <v-btn icon="mdi-magnify" variant="text"></v-btn>

                        <v-btn icon="mdi-filter" variant="text"></v-btn>
                    </template>

                    <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
                </v-app-bar>

                <v-navigation-drawer
                    v-model="drawer"
                    :location="$vuetify.display.mobile ? 'bottom' : undefined"
                    temporary
                >
                    <v-list-item link>
                        <RouterLink to="/home">Home</RouterLink>
                    </v-list-item>
                    <v-list-item link>
                        <RouterLink to="/login">Login</RouterLink>
                    </v-list-item>
                </v-navigation-drawer>

                <v-main style="height: 500px">
                    <v-card-text>
                        <RouterView />
                    </v-card-text>
                </v-main>
            </v-layout>
        </v-card>
    </v-app>
</template>

<script>
export default {
    name: "App",
    components: {},

    data: () => ({
        drawer: false,
    }),
};
</script>
