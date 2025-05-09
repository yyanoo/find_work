const { createApp, ref, reactive, watchEffect, useRouter } = Vue;

createApp({

    setup() {
        // 網站 UI 數據
        const siteData = reactive({
            siteName: "骰子魔物戰",
            siteLink:"./",
            navLinks: [
                { text: "首頁", url: "./" },
                { text: "聯絡方式", url: "./main1.html" }
            ],

            mainTitle: "骰子魔物戰",
            subTitle: "點擊按鈕 進行投骰子 依照大小來決定傷害判例",
        })

        // 玩家數據
        const player = reactive({
            lvl: 1,
            exp: 0,
            exp_tonextlvl: 5,
            hp: 10,
            max_hp: 10,
            atk: 3
        })

        // 怪物數據
        const monster = reactive({
            get_exp: 3,
            hp: 100,
            max_hp: 100,
            atk: 2
        })

        //網頁狀態管理
        const textControlPanel = reactive({
            numRoll: 0,
            textGameover: "Game Over"
        })

        function rollDice() {
            return Math.floor(Math.random() * 6) + 1;
        }

        // 檢查等級提升
        function checkLvlUp() {
            while (player.exp >= player.exp_tonextlvl) {
                player.exp -= player.exp_tonextlvl;
                player.lvl++;
                player.exp_tonextlvl = Math.floor(player.exp_tonextlvl * 2);
                player.atk += 3;
                player.hp = player.max_hp += 10;
            }
        }

        // 玩家攻擊
        function playerAttack() {
            if (monster.hp > 0) {
                textControlPanel.numRoll = rollDice();
                monster.hp -= player.atk * textControlPanel.numRoll;
                //受到怪物攻擊
                player.hp -= monster.atk;
                monsterCheck();
                hpCheck();
            }

        }

        //玩家生命值回復
        function playerHeal() {
            if (player.hp > 0 && player.hp < player.max_hp) {
                player.hp += player.max_hp / 2;
            }
            if (player.hp > player.max_hp) {
                player.hp = player.max_hp;
            }
        }

        //怪物狀態管理
        function monsterCheck() {
            // 怪物重生
            if (monster.hp <= 0) {
                player.exp += monster.get_exp;
                monster.hp = monster.max_hp;
            }
        }

        function hpCheck() {
            // gameOver
            if (player.hp <= 0) {
                player.hp = 0;
                document.querySelector('#game-over').textContent = textControlPanel.textGameover;
                document.querySelector('#button_control').disabled = true;
            }
        }

        // 監聽等級變化
        watchEffect(checkLvlUp);
        return { siteData, player, monster, textControlPanel, playerAttack, playerHeal, monsterCheck, hpCheck };
    }

}).mount("#app");
