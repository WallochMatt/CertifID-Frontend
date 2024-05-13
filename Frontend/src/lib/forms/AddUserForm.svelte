<script lang="ts">
    import { ApiService } from "../../services/ApiService";
    import { onMount } from "svelte";
    import { createEventDispatcher } from 'svelte';
    import { User } from "../../models/User";
    import { updateUserList } from "../stores/userStore";

    
    export const header = 'Create a New User';

    const dispatch = createEventDispatcher();

    let formData = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        group: ''
    };
    
    
    async function handleSubmit() {
        dispatch('formSubmitted', formData);
        
        const newUser: User = new User(
            formData.firstName,
            formData.lastName,
            formData.email,
            parseInt(formData.location), // Convert to integer
            parseInt(formData.group), // Convert to integer
            formData.title
        );

        updateUserList(newUser);

        formData = {
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            location: '',
            group: ''
        };

    };


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
    
    <form on:submit|preventDefault={handleSubmit} class="add-form" >
        <!-- ^ prevent default is used to stop the page from refresh ^ -->
        
        <p class="required-field">Title</p>
        <input id={formData.title} type="text" placeholder="" bind:value={formData.title}>
        
        
        <p class="required-field">First Name</p>
        <input type="text" placeholder="" bind:value={formData.firstName}>

        <p class="required-field">Last Name</p>
        <input type="text" placeholder="" bind:value={formData.lastName}>

        
        <p class="required-field">Email</p>
        <input id={formData.email} type="text" placeholder="" bind:value={formData.email}>
        
        
        <label for="locations">Location(s)</label>
        <select name="locations" bind:value={formData.location}>
            {#each locations as location, index}
                <option value={index}>{location.city}</option>
            {/each}
        </select>
        

        <!-- Have this open corresponding modal -->
        <small>
            <button class="create-new">Create New</button>
        </small>
        
        <label for="groups">Group(s)</label>
            <select name="groups" bind:value={formData.group}>
                {#each groups as group, index}
                    <option value={index}>{group.name}</option>
                {/each}
            </select>

        <!-- Have this open corresponding modal -->
        <small>
            <button class="create-new">Create New</button>
        </small>
        
        <div class="modal-buttons">
            <!-- svelte-ignore a11y-autofocus -->
            <button type="submit" class="save">Save</button> 
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