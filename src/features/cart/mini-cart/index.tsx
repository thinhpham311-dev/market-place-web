

import MiniCartDropdownContainer from "./components/MiniCartDropdownContainer";
import MiniCartHeader from "./components/MiniCartHeader";
import MiniCartContent from "./components/MiniCartContent";
import MiniCartFooter from "./components/MiniCartFooter";
import MiniCartDropdownContent from "./components/MiniCartDropdownContent";
import MiniCartDropdownTrigger from "./components/MiniCartDropdownTrigger";

export default function MiniCart() {
    return (
        <MiniCartDropdownContainer>
            <MiniCartDropdownTrigger />
            <MiniCartDropdownContent >
                <MiniCartHeader />
                <MiniCartContent />
                <MiniCartFooter />
            </MiniCartDropdownContent>
        </MiniCartDropdownContainer>
    );
}
