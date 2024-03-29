
<script>
    import TableMaker from "../components/EllipsisButton.svelte";
    import PageHeader from "../components/PageHeader.svelte";
    import ContextMenu from "../components/ContextMenu.svelte";
    import EllipsisButton from "../components/EllipsisButton.svelte";
    import { ApiService } from "../../services/ApiService";
    import { onMount } from "svelte";
    
    export let showModal; 

    let groups = [];
    let locations = [];
    let users = [];

    // api call? users will become a request -- title, group and location will likely take a numbered key
    // let users = [
    //     {
    //         "firstName" : "Chris",
    //         "lastName" : "Haliga",
    //         "email" : "chris.haliga@certif.id",
    //         "location" : "Milwaukee, WI",
    //         "group" : groups[0].name,
    //         "title" : "Software Engineer II",
        
    //     },
    //     {
    //     "firstName" : "Chad",
    //     "lastName" : "Gouin",
    //     "email" : "chad.gouin@certif.id",
    //     "location" : "Hales Corners, WI",
    //     "group" : groups[1].name, //The group's title instead
    //     "title" : "Security Specialist",
        
    //     }
    // ];

    let colors = ["red", "blue", "green", "pink"];
    // ^Placeholder data to be changed with backend

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
        users = await ApiService.getUsers();
        groups = await ApiService.getGroups()
        locations = await ApiService.getLocations()
    })

</script>


<main>
    <PageHeader currentPage = {"Users"}/>

    <table class="data-table">
        <thead>
            <tr>
                <th class="checkbox-spacer custom-input">
                    <input type="checkbox" /> <!--bind to all users? -->
                </th>
                <th class="column-sizer">Users({users?.length ?? 0})</th>
                <th class="column-sizer">Location(s)</th>
                <th class="column-sizer">Group(s)</th>
                <th class="column-sizer">Title</th>
                <th class="checkbox-spacer"></th>
            </tr>
        </thead>

        <tbody>
            {#each users as user, index}
                <tr class="listed-item" on:contextmenu={(event) => handleRightClick(event, user)}> 
                    <td class="checkbox-spacer">
                        <input type="checkbox" /> <!--bind to user? -->
                    </td>
                    <td class="profile-block">
                        <!-- Come back to this with actual images -->
                        <button type="button" class="profile" style="background-color: {colors[index]}">
                            {user.firstName[0]}{user.lastName[0]}
                        </button>
                        <div class="name-email-block">
                            <p>{user.lastName} , {user.firstName}</p>
                            <p>{user.email}</p>
                        </div>
                    </td>
                    <td>{locations[user.location]?.locationName()}</td>
                    <td>{groups[user.group]?.name}</td>
                    <td>{user.title}</td>
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


<style>
    .name-email-block p{
        margin: .5em;
    }

    .profile-block{
        display: flex;
        align-items: center;
    }

    .profile{
        width: 2.5vw;
        height: 2.5vw;
        border-radius: 30px;
        margin-right: 1vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    

</style>