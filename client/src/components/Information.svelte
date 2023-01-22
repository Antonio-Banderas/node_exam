<script>
    // https://svelte.dev/repl/7fb0a8f3fc024bf087bba96891254ed9?version=3.38.2

    import { fly, fade } from "svelte/transition";

    function close() {
        open = false;
    }
    let open = false;
</script>

<button class="nav-question-button" on:click={() => (open = !open)}>❓</button>

{#if open}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="background" on:click={close} transition:fade />

    <div class="box" transition:fly={{ y: +700 }}>
        <h3>How to play</h3>
        <p>
            Vote on life-or-death questions at <br />
            behest of the administrator. Final results are hidden
            until the poll has been wound up.
        </p>
        <hr />
        <ul>
            <li>Administrator decides new polls!</li>
            <li>Final result is hidden!</li>
            <li>Have fun!</li>
        </ul>
        <hr />
        <p>
            A new poll is released whenever the administrator fells like it. If haven't 
            already, you can <u>sign up</u> for your daily email reminder!
        </p>
        Have feedback? Email us at hostmaster@kea.dk
        <p />

        <button class="card-button" on:click={close}>close</button>
    </div>
{/if}

<style>
    .nav-question-button {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        width: 75px;
        font-size: 1em;
        font-weight: 500;
        border: none;
        border-left: 1px solid black;
    }

    .nav-question-button:hover {
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
        width: 375px;

        text-align: left;

        padding: 16px;
        border-radius: 8px;
        border: 1px solid #f6f7f8;
        background-color: #ffffff;
        box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
    }
</style>
