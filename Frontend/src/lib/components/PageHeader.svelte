<script>
    import Modal from "./Modal.svelte";

    export let currentPage;
    let showModal; 

    let selectedContent;
</script>


<header class="page-legend">


    <div class="header-across header-above">
        <h2>Manage {currentPage}</h2>
        <!-- <div class="header-id">
            <p>{currentUser.lastName}, {currentUser.firstName}</p>
            <button class="current-user-pic">
                {currentUser.firstName[0]}{currentUser.lastName[0]}
            </button>
        </div> -->
    </div>
    
    <div class=header-across>
        <input type="text" id="search" placeholder="Search">
        <div class="buttons-spacing">
            <button class="more-actions">More Actions...</button>
            <button class="create-button" on:click={() => showModal = true}>Create +</button>
        </div>
    </div>
</header>

<Modal bind:showModal={showModal} selectedContent={currentPage}/>

<style>
    ::placeholder {
        color: gray;
        font-size: large;
    }
    
    #search {
        background-image: url(..\..\assets\search-glass.png);
        background-position: 1%;
        background-repeat: no-repeat;
        text-indent: 6%;

        border-radius: 8px;
        background-color: transparent;
        color: black;
        height: 4vh;
        width: 28vw;
    }

    #search:active { background-image: none; }

    .more-actions{
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    .create-button{
        background-color: #9c8ecf;
        color: white
    }

    .buttons-spacing{
        width: 21%;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-direction: row;
    }
</style>