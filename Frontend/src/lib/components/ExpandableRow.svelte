<script lang="ts">
    import { onMount } from "svelte";
    import ContextMenu from "./ContextMenu.svelte";
    import EllipsisButton from "./EllipsisButton.svelte";
    import { ApiService } from "../../services/ApiService";
    import type { AccessPoint } from "../../models/AccessPoint";
    export let city;
    export let state;
    export let address;
    export let zip;
    export let accessPoints:Array<number> = [];
    export let isChecked = false;

    let isExpanded = false;

    let uniqueGroups = [];
    let groups = [];
    let allAccessPoints = [];

    var arrow = "arrow-down"

    export function dropdown(){
        isExpanded = !isExpanded;
            if(arrow == "arrow-down"){
                arrow = "arrow-up"
            }
            else{
                arrow = "arrow-down"
            }
    };

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
        allAccessPoints = await ApiService.getAccessPoints()
        uniqueGroups = groups.filter((x) => accessPoints.includes(x.id))
    })
</script>

<tr class="listed-item " on:contextmenu={(event) => handleRightClick(event, null)}> 
    <td class="checkbox-spacer">
        <label class="container">
            <input type="checkbox" /> <!--bind to user? -->
            <span class="checkmark"></span>
        </label>
    </td>
    <td>{city}, {state}</td>
    <td>
        <p>
            {address} 
        </p>
        <p>
            {city}, {state} {zip}
        </p>
    </td>
    <td>
        {#if uniqueGroups.length > 1}
            Multiple Groups
        {:else}
            {uniqueGroups?.[0]?.name}
        {/if}
    </td>
    <td class="arrow">
        {#if uniqueGroups.length > 1}
            <button class={arrow}  on:click={dropdown}></button>
        {/if}
    </td>
    <td class="final-col">
        <EllipsisButton />
    </td>
</tr>


{#if isExpanded}

{#each accessPoints as accessPoint}
    <tr class="expanded-location listed-item" on:contextmenu={(event) => handleRightClick(event, accessPoint)}>
        <td class="checkbox-spacer">
            <label class="container">
                <input type="checkbox" /> <!--bind to user? -->
                <span class="checkmark"></span>
            </label>
        </td>
        <td class="indent">{allAccessPoints[accessPoint].entrance}</td>
        <td class="fade">        
            <p>
                {address} 
            </p>
            <p>
                {city}, {state} {zip}
            </p>
        </td>
        <td>{groups.filter(x => allAccessPoints[accessPoint].groups.includes(x.id)).map(x => x.name).join(", ")}</td>
        <td></td>
        <td></td>
    </tr>
{/each}

{/if}

{#if isContextMenuVisible}
    <ContextMenu bind:isVisible={isContextMenuVisible} x={contextMenuX} y={contextMenuY} item={selectedItem} />
{/if}


<style>
    .arrow{
        text-align: center;
    }

    .arrow-down {
        background-color: transparent;
        padding: 0;
        width: .75vw;
        height: .75vw;
        border-left: .75vw solid transparent;
        border-right: .75vw solid transparent;
        border-top: .75vw solid #363c3e;
        cursor: pointer;
    }

    .arrow-down:hover{
        border-color: transparent;
        background-color: transparent;
        padding: 0;
        width: .75vw;
        height: .75vw;
        border-left: .75vw solid transparent;
        border-right: .75vw solid transparent;
        border-top: .75vw solid #9c8ecf;
        cursor: pointer;
    }


    .arrow-up {
        background-color: transparent;
        padding: 0;
        width: .75vw;
        height: .75vw;
        border-left: .75vw solid transparent;
        border-right: .75vw solid transparent;
        border-bottom: .75vw solid #363c3e;
        cursor: pointer;
    }

    .arrow-up:hover{
        border-color: transparent;
        background-color: transparent;
        padding: 0;
        width: .75vw;
        height: .75vw;
        border-left: .75vw solid transparent;
        border-right: .75vw solid transparent;
        border-bottom: .75vw solid #9c8ecf;
        cursor: pointer;
    }









    .expanded-location {
        width: 100%;
    }

    .indent{
        padding-left: 2vw;
    }

    .fade{
        opacity: 40%;
    }

</style>