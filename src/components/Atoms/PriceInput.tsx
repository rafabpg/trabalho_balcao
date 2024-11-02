import { NumericFormat } from "react-number-format";
import  { forwardRef } from "react"

const PriceInput = forwardRef<HTMLInputElement, React.ComponentProps<typeof NumericFormat>>(({ ...props }, ref) => {
    return (
        <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale={true}
            placeholder="R$ 0,00"
            {...props}
            getInputRef={ref}
            valueIsNumericString={true}
            allowNegative={false}
            value={props.value}
        />
    );
});

export default PriceInput