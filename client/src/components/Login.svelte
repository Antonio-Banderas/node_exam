<script>
    import { fly, fade } from "svelte/transition";
    import { BASE_URL, authenticated } from "../store/global";
    import io from "socket.io-client";
    const socket = io("http://localhost:8080");

    function close() {
        open = false;
    }
    let open = false;

    // --- LOGIN --- //
    let password;
    async function login(password) {
        await fetch($BASE_URL + "/login/api/login", {
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ password }),
            headers: { "content-type": "application/json" },
        }).then((response) => {
            if (response.ok) {
                $authenticated = true;
                close();
            } else {
                alert("Wrong credentials!");
            }
        });
    }

    // --- LOGOUT --- //
    async function logout() {
        await fetch($BASE_URL + "/login/api/logout", {
            credentials: "include",
            method: "POST",
        }).then((response) => {
            if (response.ok) {
                $authenticated = false;
                close();
            } else {
                alert("error logging out!");
            }
        });
    }

    // --- NEW POLL SUBMISSION --- //
    let title;
    let option1_title;
    let option2_title;

    async function submit(title, option1_title, option2_title) {
        await fetch($BASE_URL + "/admin/api/newPoll", {
            method: "POST",
            body: JSON.stringify({
                title,
                option1_title,
                option2_title,
            }),
            headers: {
                "content-type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                close();
                socket.emit("newPollfromClient")
            } else {
                alert("Error posting new poll!");
            }
        });
    }
</script>

<button class="nav-login-button" on:click={() => (open = !open)}>🔑</button>

{#if open}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="background" on:click={close} transition:fade />

    <div class="box" transition:fly={{ y: +700 }}>
        {#if !$authenticated}
            <h3>Login:</h3>
            <input bind:value={password} type="password" />
            <button on:click={login(password)}> login </button>
        {/if}
        {#if $authenticated === true}
            <h3>Administrator page:</h3>
            <button class="card-button" on:click={logout}>logout now</button>
            <hr />
            <h3>Submit new poll:</h3>
            <input bind:value={title} type="text" placeholder="title"/><br/>
            <input bind:value={option1_title} type="text" placeholder="option 1 title"/><br/>
            <input bind:value={option2_title} type="text" placeholder="option 2 title"/><br/>
            <button on:click={submit(title,option1_title,option2_title)}> Submit </button>
        {/if}
    </div>
{/if}

<style>
    .nav-login-button {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;

        width: 75px;

        border: none;
        border-right: 1px solid black;
    }

    .nav-login-button:hover {
        cursor: pointer;
    }

    .card-button {
        border-radius: 10px;
        border: 2px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #f9f9f9;
        cursor: pointer;
        transition: border-color 0.25s;
    }
    .card-button:hover {
        border-color: #646cff;
    }

    .background {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(141, 215, 224, 0.068);
        z-index: 1;
    }
    .box {
        z-index: 2;
        position: fixed;
        bottom: 40%;

        height: 450px;
        width: 367px;

        text-align: left;

        padding: 16px;
        border-radius: 8px;
        border: 1px solid #f6f7f8;
        background-color: #ffffff;
        box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
    }
</style>
