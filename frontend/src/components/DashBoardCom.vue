<template>
    <div class="back">
        <div class="div-center">
            <div class="content">
                <h3>{{ name }} Dashboard</h3>
                <button class="btn btn-danger" v-on:click="logot()"> Logout </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "DashboardCom",
    data() {
        return {
            name: ""
        }
    },
    methods: {
        async logot() {
            const token = localStorage.getItem("token")
            const parsetoken = JSON.parse(token)
            try {
                const response = await axios.get("http://localhost:2409/api/v1/auth/logout", {
                    headers: {
                        'Authorization': parsetoken, // Replace with your token
                        'Content-Type': 'application/json'
                    }
                })
                if (response.data.success) {
                    localStorage.removeItem('token');
                    this.$toast.open({
                        message: response.data.message,
                        type: 'success',
                        position: 'top-right',
                        duration: 5000,
                        dismissible: true,
                    });
                    this.$router.push({ name: 'Login' });
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    this.$toast.open({
                        message: error.response.data.message,
                        type: 'success',
                        position: 'top-right',
                        duration: 5000,
                        dismissible: true,
                    });
                } else {
                    this.$toast.open({
                        message: "somenthing went wrong",
                        type: 'success',
                        position: 'top-right',
                        duration: 5000,
                        dismissible: true,
                    });
                }
            }
        }
    },
    async mounted() {
        try {

            const token = localStorage.getItem("token")
            const parsetoken = JSON.parse(token)
            const response = await axios.get("http://localhost:2409/api/v1/auth/user", {
                headers: {
                    'Authorization': parsetoken, // Replace with your token
                    'Content-Type': 'application/json'
                }
            })
            this.name = response.data.user.name
        } catch (error) {
            console.log(error)
        }
    }
}
</script>

<style scoped>
.back {
    background: #e2e2e2;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
}

.div-center {
    width: 400px;
    height: 100px;
    background-color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
    padding: 1em 2em;
    border-bottom: 2px solid #ccc;
    display: table;
}
</style>
