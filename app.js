const { createApp, ref, reactive, watchEffect } = Vue;

createApp({
    setup() {
        // 網站 UI 數據
        const siteData = reactive({
            siteName: "我的網站",
            navLinks: [
                { text: "首頁", url: "" },
                { text: "角色資訊", url: "main1.html" }
            ],
            Main_title: "骰子魔物戰",
            Sub_title: "點擊按鈕 進行投骰子 依照大小來決定移動距離與傷害判例"
        });

        // 玩家數據
        const player = reactive({
            lvl: 1,
            exp: 0,
            exp_tonextlvl: 5,
            hp: 10,
            max_hp: 10,
            atk: 3
        });

        // 怪物數據
        const monster = reactive({
            get_exp: 3,
            hp: ref(5),
            max_hp: 5,
            atk: 2
        });

        // 檢查等級提升
        const checkLvlUp = () => {
            while (player.exp >= player.exp_tonextlvl) {
                player.exp -= player.exp_tonextlvl;
                player.lvl++;
                player.exp_tonextlvl = Math.floor(player.exp_tonextlvl * 2);
                player.atk += 3;
                player.hp = player.max_hp += 10;
            }
        };

        // 玩家攻擊
        const playerAttack = () => {
            if (monster.hp > 0) {
                monster.hp -= player.atk;
                if (monster.hp <= 0) {
                    player.exp += monster.get_exp;
                    monster.hp = monster.max_hp; // 怪物重生
                }
            }
        };

        // 監聽等級變化
        watchEffect(checkLvlUp);

        return { siteData, player, monster, playerAttack };
    }
}).mount("#app");
