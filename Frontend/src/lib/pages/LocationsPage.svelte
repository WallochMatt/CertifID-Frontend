<script>
    import PageHeader from "../components/PageHeader.svelte";
    import TableMaker from "../components/EllipsisButton.svelte";
    import ExpandableRow from "../components/ExpandableRow.svelte";
    import ContextMenu from "../components/ContextMenu.svelte";
    import { onMount } from "svelte";
    import { ApiService } from "../../services/ApiService";
    import { locationStore } from "../stores/locationStore";

    
    onMount( async () => {
        
        const fetchedLocations = await ApiService.getLocations();
        locationStore.set(fetchedLocations)
        
        groups = await ApiService.getGroups();
        accessPoints = await ApiService.getAccessPoints();
    });
    

    let groups = [];
    let accessPoints = [];
    let locations = [];
    locationStore.subscribe(value => {
        locations = value
    });

</script>

<main>
    <PageHeader currentPage = {"Locations & Access Points"}/>

    
    <table class="data-table">
        <thead>
            <tr>
                <th class="checkbox-spacer">
                    <label class="container">
                        <input type="checkbox" /> <!--bind to user? -->
                        <span class="checkmark"></span>
                    </label>
                </th>
                <th class="column-sizer">Location({locations?.length ?? 0})</th>
                <th class="column-sizer">Address</th>
                <th class="column-sizer">Associated Group(s)</th>
                <th class="column-sizer"></th>
                <th class="checkbox-spacer"></th>
            </tr>
        </thead>

        <tbody>
            {#each locations as location}

                <ExpandableRow
                    city={location.city} state={location.state} address={location.address} zip={location.zip}
                    accessPoints={location.accessPoints}
                    bind:isChecked={location.checked}
                />
            {/each}
        </tbody>
    </table>


</main>

<style>

</style>