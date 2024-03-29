<script>
    import PageHeader from "../components/PageHeader.svelte";
    import ContextMenu from "../components/ContextMenu.svelte";
    import EllipsisButton from "../components/EllipsisButton.svelte";
    import { onMount } from "svelte";
    import { ApiService } from "../../services/ApiService";
    
    export let showModal = false;
    
    let groups = [];
    
    let contextMenuX = 0;
    let contextMenuY = 0;
    let isContextMenuVisible = false;
    let selectedItem;

    function handleRightClick(event, item) {
        event.preventDefault();
        contextMenuX = event.clientX;
        contextMenuY = event.clientY;
        selectedItem = item;
        isContextMenuVisible = true;
    };

    onMount( async () => {
        groups = await ApiService.getGroups()
    })
</script>

<main>
    <PageHeader currentPage = {"Groups"}/>

    <table class="data-table">
        <thead>
            <tr>
                <th class="checkbox-spacer">
                    <label class="container">
                        <input type="checkbox" /> <!--bind to user? -->
                        <span class="checkmark"></span>
                    </label>
                </th>
                <th class="column-sizer">Group({groups?.length ?? 0})</th>
                <th class="column-sizer">Department</th>
                <th class="column-sizer">Status</th>
                <th class="column-sizer">Key Objective</th>
                <th class="checkbox-spacer"></th>
            </tr>
        </thead>
        <!-- Consider a button to send an email or message to all group members -->

        <tbody>
            {#each groups as group, index}
                <tr class="listed-item" on:contextmenu={(event) => handleRightClick(event, group)}> 
                    <td class="checkbox-spacer">
                        <label class="container">
                            <input type="checkbox" /> <!--bind to user? -->
                            <span class="checkmark"></span>
                        </label>
                    </td>
                    <td>{group.name}</td>
                    <td>{group.department}</td>
                    <td>{group.status}</td>
                    <td>{group.objective}</td>
                    <td class="final-col">
                        <EllipsisButton />
                    </td>
                </tr>
            {/each}
            {#if isContextMenuVisible}
                <ContextMenu bind:isVisible={isContextMenuVisible} x={contextMenuX} y={contextMenuY} item={selectedItem} />
            {/if}
        </tbody>
    </table>
</main>
