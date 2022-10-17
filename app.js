function randomValue(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            player_health: 100,
            monster_health: 100,
            roundCounter: 0,
            winner: null,
            battle_log: []
        }
    },
    watch: {
        player_health(value) {
            if (value <= 0 && this.monster_health <= 0) {
                this.player_health = 0;
                this.monster_health = 0;
                this.winner = "draw";
            } else if (this.player_health <= 0) {
                this.player_health = 0;
                this.winner = "monster";
            }
        },
        monster_health(value) {
            if (value <= 0 && this.player_health <= 0) {
                this.player_health = 0;
                this.monster_health = 0;
                this.winner = "draw"
            } else if (this.monster_health <= 0) {
                this.monster_health = 0;
                this.winner = "player";
            }
        },
    },
    computed: {
        playerHealth() {
            return { 'width': this.player_health + '%' };
        },
        mosterHealth() {
            return { 'width': this.monster_health + '%' };
        },
        avalableSpecial() {
            return this.roundCounter % 3 !== 0;
        }
    },
    methods: {
        surrendering() {
            this.player_health = 0;
            this.winner = "monster";
        },
        player_attack() {
            this.roundCounter++;
            const attackPower = randomValue(12, 5);
            this.monster_health -= attackPower;
            this.battle_info("Player", "attack", attackPower)
            this.monster_attack()
        },
        monster_attack() {
            const attackPower = randomValue(18, 8);
            this.player_health -= attackPower;
            this.battle_info("Monster", "attack", attackPower)
        },
        special_attack() {
            this.roundCounter++;
            const attackPower = randomValue(20, 10);
            this.monster_health -= attackPower;
            this.battle_info("Player", "attack", attackPower)
            this.monster_attack()
        },
        healing() {
            this.roundCounter++;
            const heal = randomValue(19, 9);
            if (this.player_health + heal > 100) {
                this.player_health = 100
            } else {
                this.player_health += heal;
            }
            this.battle_info("Player", "heal", heal)
            this.monster_attack()
        },
        battle_info(who, what, how) {
            this.battle_log.unshift({
                person: who,
                action: what,
                amount: how
            })
        },
        newGame() {
            this.player_health = 100;
            this.monster_health = 100;
            this.roundCounter = 0;
            this.winner = null;
            this.battle_log = [];
        }
    }


});

app.mount("#game");