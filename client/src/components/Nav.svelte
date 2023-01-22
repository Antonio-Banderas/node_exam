<script>
    import Information from "./Information.svelte"
    import Login from "./Login.svelte"

</script>

<nav>
<Login/>
<h1>Everybody votes!</h1>
<Information/>
</nav>

<style>
nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: 400px;

    border: 1px rgb(145, 145, 145) solid;
    border-radius: 20px;
}

</style>