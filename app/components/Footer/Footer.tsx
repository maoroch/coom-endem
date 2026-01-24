import Link from "next/link";
import Image from "next/image";
export default function Footer() {
    return (
        <footer className="px-15 mt-20">
            <div className="px-15 py-8 rounded-3xl bg-green-50">
                <div className="flex gap-20">
                    <div className="flex flex-col w-1/3">
                        <h2 className="text-4xl">Stay Connected with Us!</h2>
                        <p className="mt-2">Subscribe to our newsletter for the latest updates.</p>
                    </div>
                    <div className="flex flex-col w-1/5 gap-3">
                        <h4 className="text-2xl">Customer <br /> Support</h4>
                        <Link href="/support">Get Help</Link>
                        <Link href="/faq">FAQ</Link>
                        <Link href="/contact">Contact Us</Link>
                    </div>
                    <div className="flex flex-col w-1/5 gap-3">
                        <h4 className="text-2xl">For Businesses</h4>
                        <Link href="/business/contact">Contact Sales</Link>
                        <Link href="/business/faq">Business FAQ</Link>
                    </div>
                    <div className="flex flex-col w-1/5 gap-3">
                        <h4 className="text-2xl">Legal</h4>
                        <Link href="/terms">Terms of Service</Link>
                        <Link href="/privacy">Privacy Policy</Link>
                    </div>
                </div>
                <div className="mt-10 flex justify-between items-center">
                    <div><p>© 2023 Coom endem. All rights reserved.</p></div>
                    <div className="icon-social flex gap-4 justify-end">
                        <Link href="/"><Image src="/icons/facebook.svg" width={40} height={40} alt="Facebook" /></Link>
                        <Link href="/"><Image src="/icons/instagram.svg" width={40} height={40} alt="Instagram" /></Link>
                        <Link href="/"><Image src="/icons/linkedin.svg" width={40} height={40} alt="LinkedIn" /></Link>
                    </div>
                </div>
            </div>

        </footer>
    );
}
