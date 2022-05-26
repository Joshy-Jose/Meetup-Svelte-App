<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import meetups from "./Meetups/meetups-store.js";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";

  let editMode;
  let page = 'overview';
  let pagedata = {};
  let editedId;


  fetch("https://meetup-svelte-f7f1d-default-rtdb.europe-west1.firebasedatabase.app/meetups.json")
  .then(res => {
    if(!res.ok) {
      throw new Error('Failed!');
    }
    return res.json();
  })
  .then(data => {
    console.log("data",data);
    const loadedMeetups = [];
    for (const key in data){
      loadedMeetups.push({
        ...data[key],
        id: key
      })
    }
    // setTimeout(() => {
    //   meetups.setMeetups(loadedMeetups);
    // }, 1000);
    
  })
  .catch(err => {
    console.log(err);
  })

  function saveMeetup(event) {

    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showdetails(event) {
    page = 'details';
    pagedata.id = event.detail;
  }
  function closeDetails () {
    page= 'overview';
    pagedata = {};
  }
  function startEdit (event) {
    editMode = 'edit';
    editedId = event.detail;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }


</style>

<Header />

<main>
  {#if page === 'overview'}

  {#if editMode === 'edit'}
    <EditMeetup id={editedId} on:save={saveMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid 
    meetups= {$meetups} 
    on:showdetails={showdetails} 
    on:edit={startEdit}
    on:add={() => {editMode = 'edit'}}/>
  {:else}
  <MeetupDetail id ={pagedata.id} on:close ={closeDetails} />
 {/if}
</main>
