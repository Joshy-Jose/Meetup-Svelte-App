<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import {isEmpty, isValidEmail} from '../helpers/validation';
  import meetup from './meetups-store';


  export let id = null;

  let title = "";
 // let titleValid = false; no need to create like this ..svelte create for you,
  let subtitle = "";
  let address = "";
  let email = "";
  let description = "";
  let imageUrl = "";
  let formIsValid = false;


  if (id) {
    const unsubscribe = meetup.subscribe(items => {
    const selectedMeetup = items.find(i => i.id === id);
    title = selectedMeetup.title;
    subtitle = selectedMeetup.subtitle;
    address = selectedMeetup.address;
    email = selectedMeetup.contactEmail;
    description = selectedMeetup.description;
    imageUrl = selectedMeetup.imageUrl;
    })

    unsubscribe();
  }
  
  const dispatch = createEventDispatcher();

  $:titleValid = !isEmpty(title);  //when ever title changes,it will be funneled throug the isempty functin
  //and ,only not false will be set true
  $:emailValid = isValidEmail(email); 
  $:addressValid = !isEmpty(address); 
  $:subtitleValid = !isEmpty(subtitle); 
  $:descriptionValid = !isEmpty(description); 
  $:imageUrlValid = !isEmpty(imageUrl); 
  $:formIsValid = titleValid && subtitleValid && addressValid && emailValid && descriptionValid && imageUrlValid;

  function submitForm() {

    const meetupData = {
      title: title,
      subtitle: subtitle,
      description:description,
      imageUrl:imageUrl,
      contactEmail:email,
      address: address
    };

    if (id) {
      meetup.updateMeetup(id, meetupData);
    } else {
      meetup.addMeetup(meetupData);
    }
    
    dispatch("save");
  }

  function cancel () {
    dispatch('cancel');
  }
  function deleteMeetup() {
    meetup.deleteMeetup(id);
    dispatch("save");
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter valid title"
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter valid subtitle"
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter valid address"
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      valid={imageUrlValid}
      validityMessage="Please enter valid Image URL"
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      id="email"
      label="E-Mail"
      valid={emailValid}
      validityMessage="Please enter valid E-Mail"
      type="email"
      value={email}
      on:input={event => (email = event.target.value)} />
    <TextInput
      id="description"
      label="Description"
      controlType="textarea"
      valid={descriptionValid}
      validityMessage="Please enter valid Description"
      value={description}
      on:input={event => (description = event.target.value)} />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
    {#if id}
      <Button type="button"  on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>
