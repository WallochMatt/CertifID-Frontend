<script>
    import { ApiService } from "../../services/ApiService";
    import { onMount } from "svelte";
    export const header = 'Create a New User';
    export let closeModal; 

    
    let title;
    let firstName;
    let lastName;
    let email
    let location = [];
    let group = [];

    
    function handleSubmit(user) {
        // This would make the post request
        ApiService.addUser(user);
        // alert("Form saved!");
        closeModal();
    }


    let groups = [];
    let locations = [];
    let users = [];


    onMount( async () => {
        users = await ApiService.getUsers();
        groups = await ApiService.getGroups();
        locations = await ApiService.getLocations();
    })
</script>

<div>
    <h2>
        Create a User
        <hr />
    </h2>
    
    <form action="" method="POST" on:submit|preventDefault={handleSubmit} class="add-form" ><!--  prevent default is used to stop the page from refresh -->
        
        <p class="required-field">Title</p>
        <input id={title} type="text" placeholder="" bind:value={title}>
        
        
        <p class="required-field">First Name</p>
        <input type="text" placeholder="" bind:value={firstName}>

        <p class="required-field">Last Name</p>
        <input type="text" placeholder="" bind:value={lastName}>

        
        <p class="required-field">Email</p>
        <input id={email} type="text" placeholder="" bind:value={email}>
        
        
        <label for="locations">Location(s)</label>
        <select name="locations" bind:value={location}>
            {#each locations as location}
                <option value={location.city}>{location.city}</option>
            {/each}
        </select>
        

        <!-- Have this open corresponding modal -->
        <small>
            <button class="create-new">Create New</button>
        </small>
        
        <label for="groups">Group(s)</label>
            <select name="groups" bind:value={group}>
                {#each groups as group}
                    <option value={group.name}>{group.name}</option>
                {/each}
            </select>

        <!-- Have this open corresponding modal -->
        <small>
            <button class="create-new">Create New</button>
        </small>
        
        <div class="modal-buttons">
            <!-- svelte-ignore a11y-autofocus -->
            <button class="close" autofocus on:click={closeModal}>Close</button>
            <!-- svelte-ignore a11y-autofocus -->
            <button class="save" on:click={handleSubmit}>Save</button> 
        </div>
    </form>
</div>

<style>
    input, select{
        height: 3vh;
        box-sizing: border-box;
        border-radius: 5px;
        border-width: 2px;
        border-style: inset;
        border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
        border-image: initial;
    }

    h2 {
        margin: 0;
        
    }

    form > p{
        margin: 0;
        margin-top: 1.5em
    }

</style>