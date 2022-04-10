<template>
    <header>
        <nav>
            <span @click="$emit('showDeleteCity')" class="material-icons-outlined">edit</span>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Navbar',
    emits: ['showDeleteCity'],
}
</script>

<style lang="scss" scoped>

nav{
    color: white;
    padding: 10px;
    text-align: end;

    span{
        cursor: pointer;
    }
}
</style>