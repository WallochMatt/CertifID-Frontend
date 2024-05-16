<script lang="ts">
    import { ApiService } from "../../services/ApiService";
    import { onMount } from "svelte";
    import { createEventDispatcher } from 'svelte';
    import { Location } from "../../models/Location";
    import { updateLocationList } from "../stores/locationStore";

    export const header = 'Create a New Location or Access Point';

    const dispatch = createEventDispatcher();

    let formData = {
        id: '',
        city: '',
        state: '',
        address: '',
        zip: '',
        accessPoints: []
    };
    
    async function handleSubmit() {
        dispatch('formSubmitted', formData);

        if (formData.zip.length == 4){
            alert("Zip codes are 5 digits");
        }
        else{
            const newLocation: Location = new Location(
                parseInt(formData.id),
                formData.city,
                formData.state,
                formData.address,
                formData.zip,
                formData.accessPoints
            );
    
            updateLocationList(newLocation);
    
            formData = {
                id: '',
                city: '',
                state: '',
                address: '',
                zip: '',
                accessPoints: []
            };
        };
    };

    let accessPoints = [];
    onMount( async () => {
        accessPoints = await ApiService.getAccessPoints();
    })

</script>

<div>
    <h2>
        Create a Location or Access Point
        <hr />
    </h2>

    <form on:submit|preventDefault={handleSubmit} class="add-form"><!--  prevent default is used to stop the page from refresh -->
        
        <p class="required-field">State</p>
        <input type="text" placeholder="" bind:value={formData.state}>

        <p class="required-field">City</p>
        <input type="text" placeholder="" bind:value={formData.city}>
        

        <p class="required-field">Address</p>
        <input type="text" placeholder="" bind:value={formData.address}>

        <label for="associated-groups">Zip</label>
        <input name="associated-groups" type="text" placeholder="" bind:value={formData.zip}>
        
        <label for="access-points">Access Points</label>
        <select name="access-points" bind:value={formData.accessPoints}>
            {#each accessPoints as accessPoint, index}
                <option value={index}>{accessPoint.entrance}</option>
            {/each}
        </select>

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