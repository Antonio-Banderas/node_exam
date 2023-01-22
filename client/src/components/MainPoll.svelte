<script>
    import { onMount } from "svelte";
    import { BASE_URL, allPolls, voted } from "../store/global";
    import io from "socket.io-client";
    const socket = io("http://localhost:8080");

    // ------ MAIN POLL ------ //
    let poll = {};
    let option1 = {};
    let option2 = {};

    onMount(fetchPoll);
    async function fetchPoll() {
        const respone = await fetch($BASE_URL + "/poll/api/polls");
        const data = await respone.json();

        $allPolls = data.data;
        poll = data.data.pop();
        option1 = poll.option1;
        option2 = poll.option2;

        currentCount = poll.total_votes;
    }

    //---- VOTE ON MAIN POLL ---- //
    async function voteOnPoll(choice) {
        updateCount();
        await fetch($BASE_URL + "/poll/api/pollVote/" + poll._id, {
            method: "PATCH",
            body: JSON.stringify({ choice }),
            headers: { "content-type": "application/json" },
        });
    }

    // --- SOCKET.IO --- //

    let currentCount;

    socket.on("newCountFromServer", (data) => {
        currentCount = data.count;
    });
    socket.on("newPollFromServer", (data) => {
        location.reload();
    });
    function updateCount() {
        socket.emit("newCountToServer", { newCount: currentCount });
    }

    // -------------- //
    let hasVoted = $voted;
</script>

<section class="poll">
    <p>todays dilemma:</p>
    <h3>{poll.title}</h3>
    <p>total votes: {currentCount}</p>
</section>

<button disabled={hasVoted} on:click={() => voteOnPoll("option1")}
    >{option1.title}</button
>
<button disabled={hasVoted} on:click={() => voteOnPoll("option2")}
    >{option2.title}</button
>

<style>
    button {
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
    button:hover {
        border-color: #646cff;
    }
</style>
