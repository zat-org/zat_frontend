<template>
    <div class="container">
        <div class="card background-grad">
            <h2>
                هذه الصفحة غير متاحة حاليا
            </h2>
            <img class="img-404" src="/images/404.svg">
            <button @click="handleError" class="btn btn-info w-50 m-auto">
                العودة للصفحة الرئيسية
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const error = useError()
console.log(error.value);
const handleError = () => {
    navigateTo("/")

}
</script>

<style scoped>
.card {
    width: 80%;
    text-align: center;
    padding: 2em;
}

.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.img-404 {
    display: block;
    width: 50%;
    margin: 0.3em auto;
}

.background-grad {
    background: #FDC830;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #F37335, #FDC830);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #F37335, #FDC830);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>