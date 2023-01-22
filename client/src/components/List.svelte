<script>
    import { allPolls } from "../store/global.js";

    import { fly, fade } from "svelte/transition";

    let open = false;
    function close() {
        open = false;
    }
    
    let selectedPoll;
    function bringUpResult(poll) {
        selectedPoll = poll;
        open = true;
    }
    
</script>

{#each $allPolls as poll}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <p class="poll" on:click={bringUpResult(poll)}>
        {poll.title}
    </p>
{/each}

{#if open}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="background" on:click={close} transition:fade />

    <div class="box" transition:fly={{ y: -700 }}>
        <h3>The results are in!</h3>
        <p>Title: {selectedPoll.title}</p>
        <p>Total votes: {selectedPoll.total_votes}</p>
        <p>
            {selectedPoll.option1.title}: {selectedPoll.option1.votes}<br />
            {selectedPoll.option2.title}: {selectedPoll.option2.votes}
        </p>
        <button class="card-button" on:click={close}>close</button>
    </div>
{/if}

<style>
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
        align-self: center;
        z-index: 2;
        position: fixed;
        bottom: 55%;

        width: 200px;

        text-align: left;

        padding: 16px;
        border-radius: 8px;
        border: 1px solid #f6f7f8;
        background-color: #ffffff;
        box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
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
        transition: border-color 0.25s;
    }
    button:hover {
        border-color: #646cff;
    }
    .poll {
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
    .poll:hover {
        border-color: #646cff;
    }
</style>
