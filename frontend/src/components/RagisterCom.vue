<template>
    <div class="back">
        <div class="div-center">
            <div class="content">
                <h3>Ragister</h3>
                <hr />
                <form @submit.prevent="handlelogin" novalidate>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" class="form-control" :class="{ 'is-invalid': errors.name }" v-model="name"
                            id="name" placeholder="Name">
                        <div class="invalid-feedback">{{ errors.name }}</div>
                    </div>


                    <div class="form-group mt-2">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }" v-model="email"
                            id="exampleInputEmail1" placeholder="Email">
                        <div class="invalid-feedback"> {{ errors.email }}</div>
                    </div>
                    <div class="form-group mt-2">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" v-model="password" class="form-control"
                            :class="{ 'is-invalid': errors.password }" id="exampleInputPassword1"
                            placeholder="Password">
                        <div class="invalid-feedback"> {{ errors.password }}</div>
                    </div>
                    <button type="submit" class="btn btn-primary mt-3">Submit</button>
                    <hr />
                    <router-link to="/" class="btn btn-link">Login</router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "RagistrCom",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            errors: {}
        }
    },
    methods: {
        async handlelogin() {
            this.errors = this.validateForm();
            if (Object.keys(this.errors).length === 0) {

                try {
                    const response = await axios.post("http://localhost:2409/api/v1/auth/ragister", {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    });
                    if (response.data.success) {
                        this.$toast.open({
                            message: response.data.message,
                            type: 'success',
                            position: 'top-right',
                            duration: 5000,
                            dismissible: true,
                        });
                        this.$router.push({ name: 'Login' });

                    } else {
                        this.$toast.open({
                            message: response.data.message,
                            type: 'error',
                            position: 'top-right',
                            duration: 2000,
                            dismissible: true,
                        });
                    }
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.message) {
                        this.$toast.open({
                            message: error.response.data.message,
                            type: 'error',
                            position: 'top-right',
                            duration: 2000,
                            dismissible: true,
                        });
                    } else {
                        this.$toast.open({
                            message: 'An error occurred. Please try again.',
                            type: 'error',
                            position: 'top-right',
                            duration: 5000,
                            dismissible: true,
                        });
                    }
                }
            }

        },

        //Validate Form
        validateForm() {
            const errors = {}

            if (!this.name) {
                errors.name = "Name is Required"
            }

            if (!this.email) {
                errors.email = "Email is Required"
            } else if (!this.validEmail(this.email)) {
                errors.email = "Valid Email is Required"
            }

            if (!this.password) {
                errors.password = "Password is Required"
            } else if (this.password.length < 6) {
                errors.password = "Password Must be greter than six"
            }
            return errors;
        },
        validEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
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
    height: 400px;
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

div.content {
    display: table-cell;
    vertical-align: middle;
}
</style>
