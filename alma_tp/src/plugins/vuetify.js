import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import {colors} from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    theme: {
        themes: {
            light: {
                primary: colors.blue.lighten4,
                secondary: colors.blue.darken4,
                //accent: colors.indigo,
                error: colors.red.darken1,
                //         warning: ...,
                //         info: ...,
                //         success: ... ,
            }
        }
    }
});
