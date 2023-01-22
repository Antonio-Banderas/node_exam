<script>
  // --- AUX --- //
  import { onMount } from "svelte";
  // --- COMPONENTS --- //
  import Nav from "./components/Nav.svelte";
  import MainPoll from "./components/MainPoll.svelte";
  import List from "./components/List.svelte";
  import Information from "./components/Information.svelte";

  // --- THE STORE --- //
  import { BASE_URL, authenticated, voted } from "./store/global.js";

  // modify the store with up-to-date data,
  // since it is not persistent when refreshing
  onMount(fetchSessionData);
  async function fetchSessionData() {
    const respone = await fetch($BASE_URL + "/session/api/session");
    const data = await respone.json();
  
    $authenticated = data.isAuthenticated
    $voted = data.hasVoted
  }

  // --- TIME --- //
  import Time from "svelte-time";
</script>

<nav>
  <Nav />
</nav>

<main>
  <hr />
  <MainPoll />
  <hr />
</main>

<footer>
  <List />
</footer>

<Time live />

<style>
</style>
