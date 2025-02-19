aaa
import {ref,reactive,watchEffect} from 'vue'

let player = reactive({
    lvl:ref(1),
    exp:ref(0),
    exp_tonextlvl:ref(5),
    max_hp:ref(0),
    hp:ref(max_hp),
    atk:ref(3)
})

const monster = reactive({
    get_exp:3,
    hp: 10,
    atk:2
})

const check_lvl_up=()=>{
    while(player.exp.value >= player.exp_tonextlvl.value){
        player.exp.value -= player.exp_tonextlvl.value;
        player.lvl.value ++;
        player.exp_tonextlvl.value = Math.floor(player.exp_tonextlvl.value * 2);
        player.atk.value += 3;
        player.hp.value += 10
    }
}

const get_exp=()=>{
    if(monster.hp.value <=0)
    {
        player.exp.value += monster.get_exp;
        check_lvl_up;
    }
}

const player_atk=()=>{
    if (monster.hp.value > 0) {
        monster.hp.value -= player.atk;
        if(monster.hp.value <= 0){
            get_exp;
        }
    }
}

const { createApp } = Vue;
createApp({
    data() {
        return {
            siteName: "我的網站",
            navLinks: [
                { text: "首頁", url: "#" },
                { text: "關於", url: "#" },
                { text: "服務", url: "#" },
                { text: "聯絡我們", url: "#" }
            ],
            heroTitle: "歡迎來到我的網站",
            heroSubtitle: "這是一個使用 Bootstrap 5 和 Vue 3 的基礎框架",
            features: [
                { title: "功能 1", description: "這是一些簡單的介紹內容。" },
                { title: "功能 2", description: "這是一些簡單的介紹內容。" },
                { title: "功能 3", description: "這是一些簡單的介紹內容。" }
            ]
        };
    },

    methods: {
        changeTitle() {
            player_atk;
        }
    }

}).mount("#app");