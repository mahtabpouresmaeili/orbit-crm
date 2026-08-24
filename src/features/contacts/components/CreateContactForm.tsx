import { useState, type ChangeEvent, type FormEvent } from 'react';
import { createContactSchema, type CreateContactInput } from '../schemas/createContactSchema';

interface CreateContactFormProps {
  onSubmit: (contact: CreateContactInput) => Promise<void>;
  isSubmitting : boolean
}

const initialValues: CreateContactInput = {
  fullName: '',
  email: '',
  company: '',
  stage: 'lead',
};

export function CreateContactForm({ onSubmit, isSubmitting }: CreateContactFormProps) {
  const [formValues, setFormValues] =
    useState<CreateContactInput>(initialValues);
  
  const [errors, setErrors] = useState<Partial<Record<keyof CreateContactInput, string[]>>>({})
  
  ///handleSubmit
 async function handleSubmit(event: FormEvent<HTMLFormElement> ){
  event.preventDefault()
  //validate the form data with Zod inside the submit handler. If validation fails, display field-level errors and stop execution. Only validated data is passed to the mutation.
 const result = createContactSchema.safeParse(formValues)
 if(!result.success){
  setErrors(result.error.flatten().fieldErrors)
  return;
 }
 try{
  await onSubmit(result.data);
  setFormValues(initialValues);
  setErrors({})
 } catch{
  //We will display the mutation error later.
 }
 }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    //clear filed-level error when the user starts correcting that field.
    setErrors ((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }))
  }

  return (
    <form className="create-contact-form" onSubmit={handleSubmit}>
      <label>
        <span>Full name</span>
        <input
          name="fullName"
          value={formValues.fullName}
          onChange={handleChange}
        />
        {errors.fullName?.[0] && (
          <p role='alert'>{errors.fullName[0]}</p>
        )}
      </label>

      <label>
        <span>Email</span>
        <input name="email" value={formValues.email} onChange={handleChange} />
        {errors.email?.[0] && (
          <p role='alert'>{errors.email[0]}</p>
        )}
      </label>

      <label>
        <span>Relationship</span>
        <select
          name="stage"
          value={formValues.stage}
          onChange={handleChange}
        >
          <option value="lead">Lead</option>
          <option value="qualified">Qualified</option>
          <option value="customer">Customer</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.stage?.[0] && (
          <p role='alert'>{errors.stage[0]}</p>
        )}
      </label>

      <label>
        <span>Company</span>
        <input name='company' value ={formValues.company} onChange={handleChange}/>
        {errors.company?. [0] && (
          <p role='alert'>{errors.company[0]}</p>
        )}
      </label>

      <button 
      type="submit"
      disabled={isSubmitting}
      >
        {isSubmitting? "Adding...": "Add contact"}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
