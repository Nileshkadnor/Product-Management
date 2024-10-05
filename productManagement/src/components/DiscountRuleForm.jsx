import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const DiscountRuleForm = ({ rules, onRulesChange }) => {
  const { register, control, handleSubmit } = useForm({ defaultValues: { rules } });
  const { fields, append, remove } = useFieldArray({ control, name: 'rules' });

  const onSubmit = (data) => {
    onRulesChange(data.rules);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Discount Rules</h3>
      {fields.map((rule, index) => (
        <div key={rule.id}>
          <select {...register(`rules[${index}].type`)} required>
            <option value="">Select Rule Type</option>
            <option value="buyXGetY">Buy X, Get Y Free</option>
            <option value="percentage">Percentage Discount</option>
          </select>

          <input type="number" {...register(`rules[${index}].amount`)} placeholder="Amount" required />
          
          <button type="button" onClick={() => remove(index)}>Remove Rule</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ type: '', amount: 0 })}>Add Rule</button>
      <button type="submit">Save Rules</button>
    </form>
  );
};

export default DiscountRuleForm;
