import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
    const isAuthenticated = localStorage.getItem('userEmail') !== null;

    const handleClassicLogin = () => {
        window.location.href = "/login";
    };

    const handleClassicRegister = () => {
        window.location.href = "/register";
    };
    const isClassicLogin = localStorage.getItem('userEmail') !== null;
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-gray-500" />
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {isAuthenticated ? (
                        <span className="flex items-center font-bold gap-2">
                            <CircleUserRound className="text-gray-500" />
                            {localStorage.getItem('userEmail')}
                        </span>
                    ) : (
                        <span> Your hungry stops right there!</span>
                    )}
                </SheetTitle>
                <Separator />
                <SheetDescription className="flex flex-col gap-5">
                    {isAuthenticated || isClassicLogin ? ( 
                        <MobileNavLinks />
                    ) : (
                        <>
                            <Button onClick={() => handleClassicLogin} className="flex-1 font-bold bg-gray-500">Log in</Button>
                            <Button onClick={handleClassicRegister} className="flex-1 font-bold bg-gray-500">Register</Button>
                        </>
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNav;
