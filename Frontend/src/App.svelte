<script lang="ts">
  import { Appsettings } from '../Appsettings'
  import UsersPage from './lib/pages/UsersPage.svelte';
  import GroupsPage from './lib/pages/GroupsPage.svelte';
  import LocationsPage from './lib/pages/LocationsPage.svelte';
  import AdminSettingsPage from './lib/pages/AdminSettingsPage.svelte';


  if(Appsettings.Built)
  {
    //Logic for when built by the function app
  };
  
  // The selected manager acts as a key select for the pages, ex pages["Users"] instatntiates UsersPage
  let selectedManager = 'Users';
  let showModal = false;
  
  function changeManager(selected){
    console.log("selected is: ", selected)
    selectedManager = selected;
  };
  
  let pages = {
    "Users" : UsersPage,
    "Groups" : GroupsPage,
    "Locations & Access Points" : LocationsPage,
    "Admin Settings" : AdminSettingsPage,
  };

</script>


<main class="app-main">
  
  <!-- SIDE MENU -->
  <div class="left-menu">
    <div class="brand">
      <h1>Certif.<span style="color: #9c8ecf;">ID</span></h1>
      <h2>Badging System</h2>
      <nav class="menu-options">
        {#each Object.keys(pages) as page}
          {#if page == selectedManager}
            <button on:click={() => changeManager(page)} class="selected-button">{page}</button>
          {:else}
            <button on:click={() => changeManager(page)}>{page}</button>
          {/if}
        {/each}
      </nav>
    </div>

    <div>
      <p>Matthew Walloch</p>
    </div>
  </div>
  
  
  <!-- RIGHT MAIN PAGE -->
  <div class="manage">
      <svelte:component this={pages[selectedManager]}/>
  </div>
</main>

<style>
  .app-main{
    margin: 0;
    display: flex;
    flex-direction: row;
    /* height: 100vh;
    width: 100vw; */
  }
  
  .selected-button{
    background-color:black !important;
    color: white;
    border-width: 8px;
    border-style: solid;
    border-image: linear-gradient(to right, transparent 99.7%, #f3f3f3 75%) 1;
  }

  .menu-options{
  list-style: none;
  text-decoration: none;
  width: 100%;
  padding-inline-start: 0px;
  margin: 12vh 0vh;
  }

  .menu-options button{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #1c1c1c;
    width: 100%;
    height: 7vh;
    margin: 0.1vh 0vw;
    padding: 0em 2vw;
    font-size: large;
    border-radius: 0px;
  }

  .left-menu {
    position: fixed;
    height: 100%;
    width : 25%;
    display : flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #333333;
  }
  
  .manage {
    min-height: 100vh;
    margin-left: 25%;
    width : 75%;
    background-color: #f3f3f3;
  }


</style>