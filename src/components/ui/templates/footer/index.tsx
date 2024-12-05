import * as React from "react";

export default function Footer() {
    return (
        <footer className="border-t md:px-12 px-6">
            <div className=" mx-auto py-8">
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start  space-x-10">
                    {/* Logo or Brand */}
                    <div className="mb-4 lg:mb-0  lg:w-1/3 w-full">
                        <h2 className="text-xl font-semibold mb-2">Market Place</h2>
                        <p className="text-sm text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id urna non sem accumsan dictum. Nunc eget nibh ornare, accumsan odio ac, vestibulum sem
                        </p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-8 text-sm md:grid-cols-4 lg:w-2/3 w-full">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:underline">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:underline">
                                        Documentation
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Tutorials
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Support
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Legal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:underline">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Cookie Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Social</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:underline">
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 flex flex-col items-center justify-between border-t pt-4 text-center text-sm text-muted-foreground lg:flex-row">
                    <p>&copy; {new Date().getFullYear()} BrandName. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:underline">
                            Privacy
                        </a>
                        <a href="#" className="hover:underline">
                            Terms
                        </a>
                        <a href="#" className="hover:underline">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
