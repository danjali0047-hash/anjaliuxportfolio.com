import * as A from "../landing-assets";

// Footer "Let's Connect!" contacts — arranged as a 2×2 grid of icon + link.
const FOOTER_CONTACTS = [
  { key: "email", label: "danjali0047@gmail.com", href: "mailto:danjali0047@gmail.com", left: 112, top: 195, icon: "email" },
  { key: "linkedin", label: "Anjali Dubey", href: "https://www.linkedin.com/in/anjali-dubey-355b66291/", left: 620, top: 195, icon: "linkedin" },
  { key: "phone", label: "+91 8956449498", href: "tel:+918956449498", left: 112, top: 262, icon: "phone" },
  { key: "instagram", label: "@anjaliiiii.dubey", href: "https://www.instagram.com/anjaliiiii.dubey/", left: 620, top: 262, icon: "instagram" },
] as const;

function ContactIcon({ name }: { name: string }) {
  const p = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "#2a2a2a" } as const;
  switch (name) {
    case "email":
      return (<svg {...p}><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" /></svg>);
    case "phone":
      return (<svg {...p}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>);
    case "linkedin":
      return (<svg {...p}><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>);
    case "instagram":
      return (<svg {...p}><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 0 0 1.38 2.13 5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg>);
    default:
      return null;
  }
}

function FooterContacts() {
  return (
    <>
      {FOOTER_CONTACTS.map((c) => (
        <a
          key={c.key}
          href={c.href}
          target={c.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={c.key}
          className="group absolute flex items-center gap-[18px]"
          style={{ left: c.left, top: c.top }}
        >
          <span className="inline-flex size-[46px] shrink-0 items-center justify-center rounded-[12px] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-transform duration-200 group-hover:scale-110">
            <ContactIcon name={c.icon} />
          </span>
          <span className="whitespace-nowrap font-figtree text-[21.6px] text-white underline decoration-from-font underline-offset-[3px] transition-opacity group-hover:opacity-80">
            {c.label}
          </span>
        </a>
      ))}
    </>
  );
}

type Component2Props = {
  className?: string;
  property1?: "Frame 1";
};

function Component2({ className, property1 = "Frame 1" }: Component2Props) {
  const all = [A.ttaml1, A.ttaml2, A.ttaml3, A.ttaml4, A.ttaml5, A.ttaml6, A.ttaml7, A.ttaml8, A.ttaml9, A.ttaml10, A.ttaml11, A.ttaml12, A.ttaml13, A.ttaml14, A.ttaml15, A.ttaml16, A.ttaml17, A.ttaml18, A.ttaml19, A.ttaml20, A.ttaml21, A.ttaml22, A.ttaml23, A.ttaml24, A.ttaml25, A.ttaml26, A.ttaml27, A.ttaml28, A.ttaml29, A.ttaml30, A.ttaml31, A.ttaml32, A.ttaml33, A.ttaml34, A.ttaml35, A.ttaml36, A.ttaml37, A.ttaml38, A.ttaml39, A.ttaml40, A.ttaml41, A.ttaml42, A.ttaml43, A.ttaml44, A.ttaml45, A.ttaml46, A.ttaml47, A.ttaml48, A.ttaml49, A.ttaml50, A.ttaml51, A.ttaml52, A.ttaml53, A.ttaml54];
  const rowA = all.slice(0, 27); // top row — scrolls right-to-left
  const rowB = all.slice(27); // bottom row — scrolls left-to-right (no overlap with rowA)
  return (
    <div className={className || "h-[486px] overflow-clip relative w-[1728px]"} data-node-id="456:349">
      <div className="flex flex-col gap-[18px] h-full justify-center">
        <div className="overflow-hidden relative" style={{ height: 234 }}>
          <div className="marquee-track marquee-a">
            {[...rowA, ...rowA].map((src, i) => (
              <div key={i} className="h-full mr-[14px] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block h-full w-auto max-w-none rounded-[8px] object-contain pointer-events-none" src={src} />
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden relative" style={{ height: 234 }}>
          <div className="marquee-track marquee-b">
            {[...rowB, ...rowB].map((src, i) => (
              <div key={i} className="h-full mr-[14px] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block h-full w-auto max-w-none rounded-[8px] object-contain pointer-events-none" src={src} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type MacBookPro162Props = {
  className?: string;
  property1?: "Default";
};

function MacBookPro162({ className, property1 = "Default" }: MacBookPro162Props) {
  return (
    <div className={className || "h-[1117px] overflow-clip relative w-[1728px]"} data-node-id="129:250">
      <div className="absolute flex h-[380.521px] items-center justify-center left-[211.21px] top-[33.54px] w-[1171.759px]">
        <div className="flex-none rotate-[-11.55deg]">
          <div className="h-[150.23px] relative w-[1165.277px]" data-node-id="129:193" data-name="Subtract">
            <img alt="" className="absolute block inset-0 max-w-none size-full" height="150.23" src={A.imgSubtract} width="1165.277" />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1009.333px] items-center justify-center left-[238.14px] top-[-26.72px] w-[1235.821px]">
        <div className="flex-none rotate-[-11.55deg]">
          <div className="h-[806.072px] relative w-[1096.625px]" data-node-id="129:196" />
        </div>
      </div>
      <div className="absolute flex h-[1024.8px] items-center justify-center left-[220.27px] top-[-11.01px] w-[1255.449px]">
        <div className="flex-none rotate-[-11.55deg]">
          <div className="h-[818.274px] relative w-[1114.164px]" data-node-id="129:198" />
        </div>
      </div>
      <div className="absolute flex h-[1019.843px] items-center justify-center left-[238.61px] top-[11.37px] w-[1248.708px]">
        <div className="flex-none rotate-[-11.55deg]">
          <div className="h-[814.461px] relative w-[1108.063px]" data-node-id="129:200">
            <div className="absolute bg-white h-[814.461px] left-0 rounded-[10.387px] shadow-[0px_-3.813px_7.626px_0px_rgba(0,0,0,0.1)] top-0 w-[1108.063px]" data-node-id="129:201" />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1025.34px] items-center justify-center left-[222.86px] top-[31.67px] w-[1275.606px]">
        <div className="flex-none rotate-[-11.55deg]">
          <div className="h-[814.461px] relative w-[1135.517px]" data-node-id="129:202">
            <div className="absolute bg-white h-[814.461px] left-0 rounded-[10.387px] shadow-[0px_-3.813px_7.626px_0px_rgba(0,0,0,0.1)] top-0 w-[1135.517px]" data-node-id="129:203" />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1020.606px] items-center justify-center left-[253.1px] top-[43.45px] w-[1252.444px]">
        <div className="flex-none rotate-[-11.55deg]">
          <div className="h-[814.461px] relative w-[1111.877px]" data-node-id="129:204">
            <div className="absolute bg-white h-[814.461px] left-0 rounded-[10.387px] shadow-[0px_-3.813px_7.626px_0px_rgba(0,0,0,0.1)] top-0 w-[1111.877px]" data-node-id="129:205" />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1120.739px] items-center justify-center left-[207.14px] top-[21.36px] w-[1322.012px]">
        <div className="flex-none rotate-[-11.55deg]">
          <div className="h-[905.975px] relative w-[1164.179px]" data-node-id="129:229">
            <div className="absolute h-[838px] left-[0.39px] top-[-0.03px] w-[1164px]" data-node-id="129:206" data-name="Subtract">
              <img alt="" className="absolute block inset-0 max-w-none size-full" height="838" src={A.imgSubtract1} width="1164" />
            </div>
            <div className="absolute block cursor-pointer h-[143px] left-[0.39px] top-[694.97px] w-[1164px]" data-node-id="412:165" data-name="image 17">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[930.11%] left-[-7.26%] max-w-none top-[-683.67%] w-[114.27%]" src={A.imgImage17} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute flex h-[139.211px] items-center justify-center left-[calc(50%+6.67px)] top-[calc(50%-81.56px)] w-[554.952px]">
        <div className="flex-none rotate-[-10.72deg]">
          <p className="[word-break:break-word] font-figtree font-medium leading-[0.9] opacity-54 relative text-[#131313] text-[36px] text-center whitespace-nowrap" data-node-id="427:261">
            (Click here to see the projects)
          </p>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[304.305px] items-center justify-center left-[calc(50%-26.36px)] top-[calc(50%-138.17px)] w-[888.632px]">
        <div className="flex-none rotate-[-11.72deg]">
          <div className="[word-break:break-word] flex flex-col font-hand justify-center leading-[0] not-italic relative text-[115.2px] text-[color:var(--ink\/ink-black,#222)] text-center whitespace-nowrap" data-node-id="427:262">
            <p className="leading-none">UX Projects</p>
          </div>
        </div>
      </div>
      <div data-sticker className="absolute flex items-center justify-center left-[554px] size-[214.693px] top-[731px]">
        <div className="flex-none rotate-[3.89deg]">
          <div className="opacity-87 relative size-[201.501px]" data-node-id="427:263" data-name="image 635">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A.imgImage635} />
          </div>
        </div>
      </div>
      <div data-sticker className="absolute flex h-[158.565px] items-center justify-center left-[859px] top-[699px] w-[156.413px]">
        <div className="flex-none rotate-[-6.22deg]">
          <div className="h-[144.071px] opacity-86 relative w-[141.641px]" data-node-id="427:264" data-name="Subtract">
            <img alt="" className="absolute block inset-0 max-w-none size-full" height="144.071" src={A.imgSubtract2} width="141.641" />
          </div>
        </div>
      </div>
      <div className="absolute contents left-[1150px] size-[175.286px] top-[609.63px]" data-node-id="427:267">
        <div className="absolute flex h-[8.165px] items-center justify-center left-[1215.36px] top-[675.52px] w-[7.434px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="h-[7.487px] relative w-[6.662px]" data-node-id="427:268">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={A.imgVector1304} />
            </div>
          </div>
        </div>
        <div className="absolute flex h-[16.208px] items-center justify-center left-[1216.73px] top-[710.49px] w-[16.125px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="h-[14.711px] relative w-[14.617px]" data-node-id="427:269">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={A.imgVector1303} />
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[1212.35px] size-[2.629px] top-[672.84px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="relative size-[2.385px]" data-node-id="427:270">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={A.imgEllipse140} />
            </div>
          </div>
        </div>
        <div className="absolute flex h-[18.4px] items-center justify-center left-[1239.73px] top-[660.59px] w-[20.747px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="bg-white h-[16.43px] relative w-[19.08px]" data-node-id="427:271" />
          </div>
        </div>
        <div className="absolute flex h-[6.944px] items-center justify-center left-[1255.2px] top-[695.81px] w-[11.169px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="bg-[#f9f9f9] h-[5.83px] relative w-[10.6px]" data-node-id="427:272" />
          </div>
        </div>
        <div className="absolute flex h-[13.366px] items-center justify-center left-[1263.29px] top-[688.44px] w-[19.939px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="bg-[#fefefe] h-[11.395px] relative w-[18.815px]" data-node-id="427:273" />
          </div>
        </div>
        <div data-sticker className="absolute flex items-center justify-center left-[1150px] size-[175.286px] top-[609.63px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="relative size-[159px]" data-node-id="427:274" data-name="image 637">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A.imgImage637} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents h-[240.772px] left-[727px] top-[762px] w-[226.359px]" data-node-id="427:275">
        <div data-sticker className="absolute flex h-[240.772px] items-center justify-center left-[727px] top-[762px] w-[226.359px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="h-[220px] relative w-[203.729px]" data-node-id="427:276" data-name="image 636">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-full left-[-92.13%] max-w-none top-0 w-[192.13%]" src={A.imgImage636} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[5.737px] items-center justify-center left-[816.03px] top-[911.43px] w-[2.457px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="h-[5.567px] relative w-[1.865px]" data-node-id="427:277">
              <div className="absolute inset-[-4.12%_-12.29%]">
                <img alt="" className="block max-w-none size-full" src={A.imgVector1298} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[3.143px] items-center justify-center left-[818.71px] top-[908.96px] w-[1.449px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="h-[3.039px] relative w-[1.127px]" data-node-id="427:278">
              <div className="absolute inset-[-45.25%_-122.02%_-45.26%_-122.02%]">
                <img alt="" className="block max-w-none size-full" src={A.imgVector1299} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[5.6px] items-center justify-center left-[815.01px] top-[910.21px] w-[5.506px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="h-[5.09px] relative w-[4.984px]" data-node-id="427:279">
              <div className="absolute inset-[-27.02%_-27.59%_-27.01%_-27.59%]">
                <img alt="" className="block max-w-none size-full" src={A.imgVector1300} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[10.25px] items-center justify-center left-[814.5px] top-[908.36px] w-[7.507px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="h-[9.602px] relative w-[6.505px]" data-node-id="427:280">
              <div className="absolute inset-[-14.32%_-21.14%]">
                <img alt="" className="block max-w-none size-full" src={A.imgVector1301} />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-[5.206px] items-center justify-center left-[814.41px] top-[915.23px] w-[1.837px]">
          <div className="flex-none rotate-[-6.22deg]">
            <div className="h-[5.096px] relative w-[1.293px]" data-node-id="427:281">
              <div className="absolute inset-[-8.99%_-35.45%_-9%_-35.46%]">
                <img alt="" className="block max-w-none size-full" src={A.imgVector1302} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-sticker className="absolute flex items-center justify-center left-[1014.87px] size-[163.608px] top-[701.76px]">
        <div className="flex-none rotate-[7.93deg]">
          <div className="opacity-93 relative size-[145px]" data-node-id="427:282" data-name="image 633">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A.imgImage633} />
          </div>
        </div>
      </div>
      <div data-sticker className="absolute flex h-[149.064px] items-center justify-center left-[1316.3px] top-[670.73px] w-[147.289px]">
        <div className="-scale-y-100 flex-none rotate-[-96.22deg]">
          <div className="h-[133.407px] opacity-92 relative w-[135.411px]" data-node-id="427:283" data-name="Subtract">
            <img alt="" className="absolute block inset-0 max-w-none size-full" height="133.408" src={A.imgSubtract3} width="135.411" />
          </div>
        </div>
      </div>
      <div data-sticker className="absolute flex items-center justify-center left-[393px] size-[221.312px] top-[815px]">
        <div className="flex-none rotate-[-26.52deg]">
          <div className="opacity-87 relative size-[165px]" data-node-id="427:286" data-name="image 632">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A.imgImage632} />
          </div>
        </div>
      </div>
    </div>
  );
}

type Frame1Props = {
  className?: string;
  property1?: "Default";
};

function Frame1({ className, property1 = "Default" }: Frame1Props) {
  return (
    <div className={className || "bg-[rgba(255,255,255,0.31)] content-stretch flex items-center justify-center px-[48px] py-[24px] relative rounded-[91px]"} data-node-id="65:580">
      <p className="[word-break:break-word] font-figtree font-bold leading-[normal] relative shrink-0 text-[21.6px] text-center text-white whitespace-nowrap" data-node-id="61:579">{` View Projects`}</p>
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[#f9f9f9] isolate relative size-full" data-node-id="1:2" data-name="Frame">
      <div className="absolute h-[920px] left-0 shadow-[0px_12px_15.4px_6px_rgba(0,0,0,0.25)] top-0 w-[1728px]" data-node-id="1:9" data-name="image 2">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[103.06%] left-0 max-w-none top-[-0.01%] w-full" src={A.imgImage2} />
          </div>
          <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0" />
        </div>
      </div>
      <div className="absolute flex h-[150.35px] items-center justify-center left-[calc(33.33%+99.09px)] top-[25.85px] w-[160.816px]">
        <div className="flex-none rotate-[-39.48deg]">
          <div className="h-[72.053px] opacity-95 relative w-[149px]" data-node-id="463:769" data-name="Subtract">
            <img alt="" className="absolute block inset-0 max-w-none size-full" height="72.053" src={A.imgSubtract4} width="149" />
          </div>
        </div>
      </div>
      <div className="absolute left-[calc(16.67%+291px)] opacity-84 size-[182px] top-[-49px]" data-node-id="463:777" data-name="image 12">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A.imgImage12} />
      </div>
      <div className="absolute flex h-[72.108px] items-center justify-center left-[calc(33.33%+193px)] top-[136px] w-[154.488px]">
        <div className="flex-none rotate-[1.99deg]">
          <div className="h-[66.872px] opacity-95 relative w-[152.262px]" data-node-id="463:785" data-name="Subtract">
            <img alt="" className="absolute block inset-0 max-w-none size-full" height="66.872" src={A.imgSubtract5} width="152.262" />
          </div>
        </div>
      </div>
      <div className="absolute bg-white h-[843px] left-px shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] top-[4186px] w-[1728px]" data-node-id="456:520" />
      <p className="[word-break:break-word] absolute font-figtree font-bold leading-[0.9] left-[106px] opacity-5 text-[64px] text-black text-left top-[2977px] whitespace-nowrap" data-node-id="444:200">
        OTHER THAN THAT
      </p>
      <div id="ux-projects" className="absolute bg-[#282828] h-[994px] left-0 scroll-mt-[20px] shadow-[0px_-4px_22.1px_0px_rgba(0,0,0,0.25)] top-[1846px] w-[1728px]" data-node-id="414:178" />
      {/* crumpled-paper texture removed from the UX fold */}
      <div className="absolute h-[640px] left-0 top-[4411px] w-[1728px]" data-node-id="450:249">
        <div className="absolute bg-[#2a2a2a] h-[640px] left-0 top-0 w-[1728px]" data-node-id="437:170" />
        <p className="[word-break:break-word] absolute font-figtree font-semibold left-[112px] text-[27px] text-white top-[132px] whitespace-nowrap" data-node-id="450:255b">
          Find me here
        </p>
        <FooterContacts />
        <p className="[word-break:break-word] absolute font-urbanist font-bold leading-none left-[106px] opacity-56 text-[57.6px] text-white top-[510px] tracking-[-0.96px] whitespace-nowrap" data-node-id="450:272">{`Coffee, Procrastination and Love ❤️`}</p>
        <p className="[word-break:break-word] absolute font-urbanist font-normal leading-none left-[106px] opacity-46 text-[43.2px] text-white top-[462px] tracking-[-0.72px] whitespace-nowrap" data-node-id="450:273">
          Made with
        </p>
        <div className="absolute h-[628px] left-[1150px] top-[8px] w-[540px]" data-node-id="463:761" data-name="image 657">
          <img alt="" className="absolute inset-0 max-w-none object-contain object-bottom pointer-events-none size-full" src={A.imgImage657} />
        </div>
      </div>
      <div id="road-track" className="absolute z-[-1] h-[1122px] left-[calc(83.33%-25px)] overflow-clip top-[870px] w-[272.183px]" data-node-id="391:199">
        <div className="absolute h-[1158px] left-0 top-[-14px] w-[290px]">
          <img alt="" className="block max-w-none size-full" src={A.imgGroup238204} />
        </div>
      </div>
      <div data-slurp className="absolute left-[calc(66.67%-160px)] size-[490px] top-[567px]" data-node-id="389:128">
        <div className="absolute left-0 opacity-100 size-[490px] top-0" data-node-id="1:18" data-name="image 3">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A.imgImage3} />
        </div>
      </div>
      <div data-song className="absolute h-[383px] left-[140px] opacity-100 top-[585px] w-[434px]" data-node-id="1:30" data-name="image 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A.imgImage4} />
      </div>
      <div id="closed-notebook" style={{ transition: "opacity 0.3s ease" }} className="absolute h-[600.308px] left-[calc(66.67%+187px)] top-[267px] w-[549.072px]" data-node-id="69:705">
        <div className="absolute flex h-[600.308px] items-center justify-center left-0 top-0 w-[549.072px]">
          <div className="flex-none rotate-[-8.77deg]">
            <div className="h-[534.41px] opacity-92 relative w-[473.108px]" data-node-id="3:3" data-name="image 5">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[106.66%] left-[-8.58%] max-w-none top-[-1.72%] w-[120.48%]" src={A.imgImage5} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[419.057px] items-center justify-center left-[calc(91.67%-29.8px)] top-[545.53px] w-[528.397px]">
        <div className="-scale-y-100 flex-none rotate-11">
          <div className="h-[334.923px] opacity-0 relative w-[473.184px]" data-node-id="69:712" data-name="image 16">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[99.43%] left-0 max-w-none top-[0.13%] w-full" src={A.imgImage16} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[745.691px] items-center justify-center left-[-240px] top-[-230px] w-[922.998px] scale-[1.18]">
        <div className="flex-none rotate-[-19.44deg]">
          <div className="h-[508.699px] relative w-[799.265px]" data-node-id="3:9" data-name="image 6">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute h-[163.67%] left-[-28.23%] max-w-none top-[-14.4%] w-[156.25%]" src={A.imgImage6} />
            </div>
          </div>
        </div>
      </div>
      <div data-draggable className="absolute z-[60] flex items-center justify-center left-[calc(33.33%+228.43px)] size-[262.46px] top-[210.43px]">
        <div className="flex-none rotate-[-9.84deg]">
          <div className="relative size-[227px]" data-node-id="47:85" data-name="Sticky note">
            <div className="absolute inset-[19.9px_96.32%_14.76px_-12.75%]" data-node-id="I47:85;110:95;105:162" data-name="Shadow">
              <div className="absolute inset-[-15.6%_-53.65%_-15.6%_-80.48%]">
                <img alt="" className="block max-w-none size-full" src={A.imgShadow} />
              </div>
            </div>
            <div className="absolute inset-[1.7%_2.21%_2.71%_2.21%]" data-node-id="I47:85;110:95;105:187" data-name="Note">
              <div className="absolute inset-[0_-1.84%_-4.61%_-2.77%]">
                <img alt="" className="block max-w-none size-full" src={A.imgNote} />
              </div>
            </div>
            <div className="[word-break:break-word] absolute flex flex-col font-hand inset-[28.72px_29px_29.28px_29px] justify-center leading-[0] not-italic text-[38px] text-[color:var(--ink\/ink-black,#222)] text-center" data-node-id="I47:85;110:95;2:14">
              <p className="leading-none">Visual Designer</p>
            </div>
          </div>
        </div>
      </div>
      <div data-draggable className="absolute z-[60] flex items-center justify-center left-[calc(16.67%+305px)] size-[245.543px] top-[204px]">
        <div className="flex-none rotate-[4.9deg]">
          <div className="relative size-[227px]" data-node-id="47:86" data-name="Sticky note">
            <div className="absolute inset-[11.07px_96.32%_8.21px_-12.75%]" data-node-id="I47:86;110:68;105:162" data-name="Shadow">
              <div className="absolute inset-[-8.04%_-29.85%_-8.04%_-44.78%]">
                <img alt="" className="block max-w-none size-full" src={A.imgShadow1} />
              </div>
            </div>
            <div className="absolute inset-[1.7%_2.21%_2.71%_2.21%]" data-node-id="I47:86;110:68;105:187" data-name="Note">
              <div className="absolute inset-[0_-1.03%_-2.56%_-1.54%]">
                <img alt="" className="block max-w-none size-full" src={A.imgNote1} />
              </div>
            </div>
            <div className="[word-break:break-word] absolute flex flex-col font-hand inset-[15.98px_16.13px_16.29px_16.13px] justify-center leading-[0] not-italic text-[38px] text-[color:var(--ink\/ink-black,#222)] text-center" data-node-id="I47:86;110:68;2:14">
              <p className="leading-none">Product Designer</p>
            </div>
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 [word-break:break-word] absolute font-figtree font-bold leading-[0] left-1/2 opacity-100 text-[86.4px] text-center text-white top-[492px] whitespace-nowrap" data-node-id="46:14">
        <p className="leading-[0.9] mb-0 whitespace-pre">{`WELCOME TO `}</p>
        <p className="leading-[0.9] whitespace-pre">ANJALI&rsquo;S PORTFOLIO</p>
      </div>
      <p className="[word-break:break-word] absolute font-figtree font-bold leading-[0.9] left-[106px] opacity-5 text-[64px] text-black text-left top-[1032px] whitespace-nowrap" data-node-id="333:1026">
        ROAD SO FAR
      </p>
      <p className="[word-break:break-word] absolute font-figtree font-bold leading-[normal] left-[106px] text-[#00af26] text-[64px] top-[1013px] whitespace-nowrap" data-node-id="333:1027">
        ROAD SO FAR
      </p>
      <div className="absolute h-[98px] left-0 opacity-87 top-[570px] w-[102px]" data-node-id="52:145" data-name="image 13">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[239.73%] left-[-31.67%] max-w-none top-0 w-[307.9%]" src={A.imgImage13} />
        </div>
      </div>
      {/* dark-fold crumpled paper balls removed */}
      <div className="absolute h-[112px] left-[48px] opacity-87 top-[640px] w-[135px]" data-node-id="52:149" data-name="image 14">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[210.84%] left-[-13.72%] max-w-none top-[-84.34%] w-[232.67%]" src={A.imgImage13} />
        </div>
      </div>
      {/* dark-fold crumpled paper balls removed */}
      <div className="absolute contents left-[calc(50%+84px)] top-[-56px]" data-node-id="47:27">
        <div className="absolute contents h-[576.204px] left-[calc(50%+84px)] top-[-56px] w-[558.957px]" data-node-id="47:28">
          <div data-photo="back" className="absolute flex h-[439.059px] items-center justify-center left-[calc(50%+167.51px)] top-[12.57px] w-[391.937px]">
            <div className="flex-none rotate-15">
              <div className="h-[372.573px] relative w-[305.932px]" data-node-id="47:19" data-name="image 9">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[111.03%] left-[-39.43%] max-w-none top-[-4.98%] w-[180.29%]" src={A.imgImage9} />
                </div>
              </div>
            </div>
          </div>
          <div data-photo="back" className="absolute flex h-[337.492px] items-center justify-center left-[calc(50%+208.58px)] top-[38.84px] w-[324.456px]">
            <div className="flex-none rotate-15">
              <div className="h-[279.456px] relative w-[261.022px]" data-node-id="47:25" data-name="Cutaaa 1">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute h-[124.54%] left-0 max-w-none top-[-14.09%] w-full" src={A.imgCutaaa1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-photo="front" className="absolute h-[395px] left-[calc(50%+209px)] top-[42px] w-[371px]" data-node-id="54:575">
        <div className="absolute contents h-[701.239px] left-[-170px] top-[-143px] w-[689.043px]" data-node-id="52:199">
          <div className="absolute contents left-[-51.09px] top-[-30.19px]" data-node-id="52:200">
            <div className="absolute flex h-[475.623px] items-center justify-center left-[-51.09px] top-[-30.19px] w-[451.232px]">
              <div className="flex-none rotate-30">
                <div className="h-[372.573px] relative w-[305.932px]" data-node-id="52:201" data-name="image 9">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[111.03%] left-[-39.43%] max-w-none top-[-4.98%] w-[180.29%]" src={A.imgImage9} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex h-[372.527px] items-center justify-center left-[5.06px] top-[-0.43px] w-[365.78px]">
              <div className="flex-none rotate-30">
                <div className="h-[279.456px] relative w-[261.022px]" data-node-id="52:202" data-name="Cutaaa 1">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[124.54%] left-[-0.04%] max-w-none top-[0.19%] w-full" src={A.imgCutaaa2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-[8] absolute h-[458px] left-[calc(66.67%+202px)] top-[-79px] w-[517px]" data-node-id="463:722">
        <div className="absolute h-[458px] left-0 top-0 w-[517px]" data-node-id="3:12" data-name="image 7">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[300%] left-[-95.26%] max-w-none top-[-154.72%] w-[265.74%]" src={A.imgImage7} />
          </div>
        </div>
      </div>
      <a
        href="#ux-projects"
        aria-label="View projects"
        className="-translate-x-1/2 absolute top-[700px] block cursor-pointer left-[calc(50%+0.5px)]"
      >
        <Frame1 className="bg-[rgba(255,255,255,0.31)] content-stretch cursor-pointer flex items-center justify-center px-[36px] py-[18px] rounded-[68px] transition-[transform,background-color,box-shadow] duration-200 ease-out hover:bg-[rgba(255,255,255,0.55)] hover:scale-[1.06] hover:shadow-[0px_10px_28px_rgba(0,0,0,0.28)] hover:ring-1 hover:ring-white/60 active:scale-[0.98]" />
      </a>
      <div id="scroll-car" className="absolute z-[-1] flex h-[116.007px] items-center justify-center left-[calc(83.33%+119.09px)] top-[1758px] w-[115.113px]">
        <div className="flex-none rotate-[-84.24deg]">
          <div className="h-[105px] relative w-[106px]" data-node-id="391:201" data-name="image 631">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A.imgImage631} />
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] absolute font-figtree font-medium italic leading-[normal] left-[106px] text-[#848484] text-[34px] top-[1090px] w-[698px]" data-node-id="427:241">
        My Experiences
      </p>
      <div className="absolute h-0 left-[73px] top-[1571px] w-[1197px]" data-node-id="427:246">
        <div className="absolute inset-[-0.5px_0]">
          <img alt="" className="block max-w-none size-full" src={A.imgVector1306} />
        </div>
      </div>
      <div className="absolute h-0 left-[73px] top-[1405px] w-[1197px]" data-node-id="427:260">
        <div className="absolute inset-[-0.5px_0]">
          <img alt="" className="block max-w-none size-full" src={A.imgVector1306} />
        </div>
      </div>
      <div className="absolute contents left-[118px] top-[1470px]" data-node-id="427:252">
        <p className="[word-break:break-word] absolute font-figtree font-semibold leading-[0.9] left-[280px] text-[#333] text-[30px] top-[1435px] whitespace-nowrap" data-node-id="391:148">
          HECARDS
        </p>
        <p className="[word-break:break-word] absolute font-figtree font-normal leading-[0.9] left-[280px] text-[#777] text-[19px] top-[1473px] whitespace-nowrap" data-node-id="391:146">
          UI Designer
        </p>
        <p className="[word-break:break-word] absolute font-figtree font-medium leading-[0.9] left-[calc(50%+89px)] text-[#333] text-[22px] top-[1441px] whitespace-nowrap" data-node-id="427:244">
          Jun 2025 - Jul 2025
        </p>
        <p className="[word-break:break-word] absolute font-figtree font-normal leading-[normal] left-[280px] text-[#999] text-[15px] top-[1503px] w-[609px]" data-node-id="427:243">
          Directed the end-to-end UI design of the website, transforming ideas into intuitive and visually cohesive digital experiences.
        </p>
        <div className="absolute left-[106px] size-[100px] top-[1436px]" data-node-id="391:197" data-name="image 630">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A.imgImage630} />
        </div>
      </div>
      <div className="[word-break:break-word] absolute contents left-[280px] top-[1269px]" data-node-id="427:254">
        <p className="absolute font-figtree font-semibold leading-[0.9] left-[280px] text-[#333] text-[30px] top-[1269px] whitespace-nowrap" data-node-id="427:255">
          Freelancing
        </p>
        <p className="absolute font-figtree font-normal leading-[0.9] left-[280px] text-[#777] text-[19px] top-[1307px] whitespace-nowrap" data-node-id="427:256">
          UX Designer
        </p>
        <p className="absolute font-figtree font-medium leading-[0.9] left-[calc(50%+89px)] text-[#333] text-[22px] top-[1275px] w-[272px]" data-node-id="427:257">
          Dec 2025 - Present
        </p>
        <p className="absolute font-figtree font-normal leading-[normal] left-[280px] text-[#999] text-[15px] top-[1337px] w-[609px]" data-node-id="427:258">
          Collaborating with freelance clients to design seamless digital experiences, from initial concepts to polished high-fidelity interfaces.
        </p>
      </div>
      <div className="absolute contents left-[112px] top-[1671px]" data-node-id="427:253">
        <p className="[word-break:break-word] absolute font-figtree font-semibold leading-[0.9] left-[280px] text-[#333] text-[30px] top-[1601px] whitespace-nowrap" data-node-id="427:247">
          The Climate Troopers
        </p>
        <p className="[word-break:break-word] absolute font-figtree font-normal leading-[0.9] left-[280px] text-[#777] text-[19px] top-[1639px] whitespace-nowrap" data-node-id="427:248">
          UX Designer
        </p>
        <p className="[word-break:break-word] absolute font-figtree font-normal leading-[normal] left-[280px] text-[#999] text-[15px] top-[1669px] w-[609px]" data-node-id="427:250">
          Redesigned the website interactions to create a smoother user experience, while also leading form design and crafting posters and Instagram creatives.
        </p>
        <div className="absolute h-[32.233px] left-[106px] top-[1620px] w-[126.387px]" data-node-id="391:195" data-name="image 628">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img alt="" className="absolute h-[209.21%] left-[-4.36%] max-w-none top-[-48.68%] w-[106.71%]" src={A.imgImage628} />
          </div>
        </div>
        <p className="[word-break:break-word] absolute font-figtree font-medium leading-[0.9] left-[calc(50%+96px)] text-[#333] text-[22px] top-[1607px] whitespace-nowrap" data-node-id="427:249">
          Oct 2024 - Apr 2024
        </p>
      </div>
      <p className="[word-break:break-word] absolute font-figtree font-bold leading-[normal] left-[106px] text-[#00af26] text-[64px] top-[2958px] whitespace-nowrap" data-node-id="433:403">
        OTHER THAN THAT
      </p>
      <p className="[word-break:break-word] absolute font-figtree font-medium italic leading-[normal] left-[106px] text-[#848484] text-[34px] top-[3035px] w-[698px]" data-node-id="433:403-subtitle">
        Jack of all, master of none (yet)
      </p>
      <p className="[word-break:break-word] absolute font-figtree font-bold leading-[0.9] left-[106px] opacity-5 text-[64px] text-black text-left top-[3709px] whitespace-nowrap" data-node-id="456:519-shadow">
        THERE&rsquo;S ALWAYS MORE TO LIFE
      </p>
      <p className="[word-break:break-word] absolute font-figtree font-bold leading-[normal] left-[106px] text-[#00af26] text-[64px] top-[3690px] whitespace-nowrap" data-node-id="456:519">
        THERE&rsquo;S ALWAYS MORE TO LIFE
      </p>
      <p className="[word-break:break-word] absolute font-figtree font-medium italic leading-[normal] left-[106px] text-[#848484] text-[34px] top-[3767px] w-[698px]" data-node-id="456:519-subtitle">
        Cheers to life (Click!!)
      </p>
      <div className="absolute contents left-[180px] top-[1710px]" data-node-id="444:198">
        <div className="back-file absolute left-0 top-0 w-[1728px]" data-node-id="414:215">
          <div className="absolute flex h-[246.711px] items-center justify-center left-[calc(16.67%+51.66px)] top-[1897.02px] w-[1173.739px]">
            <div className="flex-none rotate-[4.78deg]">
              <div className="h-[150.23px] relative w-[1165.277px]" data-node-id="414:196" data-name="Subtract">
                <img alt="" className="absolute block inset-0 max-w-none size-full" height="150.23" src={A.imgSubtract6} width="1165.277" />
              </div>
            </div>
          </div>
          <div className="absolute flex h-[894.562px] items-center justify-center left-[331.71px] top-[1833.58px] w-[1159.919px]">
            <div className="flex-none rotate-[4.78deg]">
              <div className="h-[806.072px] relative w-[1096.625px]" data-node-id="414:199" />
            </div>
          </div>
          <div className="absolute flex h-[908.182px] items-center justify-center left-[308.14px] top-[1847px] w-[1178.414px]">
            <div className="flex-none rotate-[4.78deg]">
              <div className="h-[818.274px] relative w-[1114.164px]" data-node-id="414:200" />
            </div>
          </div>
          <div className="absolute flex h-[903.874px] items-center justify-center left-[320.11px] top-[1872.46px] w-[1172.017px]">
            <div className="flex-none rotate-[4.78deg]">
              <div className="h-[814.461px] relative w-[1108.063px]" data-node-id="414:201">
                <div className="absolute bg-white h-[814.461px] left-0 rounded-[10.387px] shadow-[0px_-3.813px_7.626px_0px_rgba(0,0,0,0.1)] top-0 w-[1108.063px]" data-node-id="414:202" />
              </div>
            </div>
          </div>
          <div className="absolute flex h-[906.159px] items-center justify-center left-[297.75px] top-[1892.78px] w-[1199.375px]">
            <div className="flex-none rotate-[4.78deg]">
              <div className="h-[814.461px] relative w-[1135.517px]" data-node-id="414:203">
                <div className="absolute bg-white h-[814.461px] left-0 rounded-[10.387px] shadow-[0px_-3.813px_7.626px_0px_rgba(0,0,0,0.1)] top-0 w-[1135.517px]" data-node-id="414:204" />
              </div>
            </div>
          </div>
          <div className="absolute flex h-[904.191px] items-center justify-center left-[324.79px] top-[1908.05px] w-[1175.816px]">
            <div className="flex-none rotate-[4.78deg]">
              <div className="h-[814.461px] relative w-[1111.877px]" data-node-id="414:205">
                <div className="absolute bg-white h-[814.461px] left-0 rounded-[10.387px] shadow-[0px_-3.813px_7.626px_0px_rgba(0,0,0,0.1)] top-0 w-[1111.877px]" data-node-id="414:206" />
              </div>
            </div>
          </div>
          <div className="absolute flex h-[999.741px] items-center justify-center left-[276.33px] top-[1883.98px] w-[1235.555px]">
            <div className="flex-none rotate-[4.78deg]">
              <div className="h-[905.975px] relative w-[1164.179px]" data-node-id="414:207">
                <div className="absolute h-[838px] left-[0.39px] top-[-0.03px] w-[1164px]" data-node-id="414:208" data-name="Subtract">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" height="838" src={A.imgSubtract7} width="1164" />
                </div>
                <div className="absolute h-[143px] left-[0.39px] top-[694.97px] w-[1164px]" data-node-id="414:211" data-name="image 17">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute h-[930.11%] left-[-7.26%] max-w-none top-[-683.67%] w-[114.27%]" src={A.imgImage17} />
                  </div>
                </div>
                <div className="absolute flex h-[868.195px] items-center justify-center left-[-1.53px] top-[-18.44px] w-[1167.748px]">
                  <div className="flex-none rotate-[-0.14deg]">
                    <div className="h-[865.3px] relative w-[1165.601px]" data-node-id="444:196">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={A.imgRectangle3381} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Click toggles the project cards (handled by <ProjectCards/>); it no
          longer navigates. role/tabIndex keep it keyboard-accessible. */}
      <div
        data-folder
        role="button"
        tabIndex={0}
        aria-label="Open UX Projects"
        className="-translate-x-1/2 absolute h-[1118px] cursor-pointer left-[calc(50%+0.22px)] top-[1774px] w-[1728px] [perspective:1200px] [perspective-origin:center]"
      >
        {/* Wrapper carries the 3D drop transform; it has NO overflow clip so
            the perspective/translateZ renders correctly (incl. Safari). The
            inner MacBookPro162 keeps its 2D overflow-clip + resting scale. */}
        <div data-files-drop className="relative size-full origin-center transition-opacity duration-300">
          <MacBookPro162 className="folder-graphic overflow-clip relative size-full scale-[0.85] origin-center" />
        </div>
      </div>
      <Component2 className="absolute h-[486px] left-[-1px] overflow-clip top-[3901px] w-[1728px]" />
      <div className="absolute contents left-[calc(66.67%+96px)] top-[256px]" data-node-id="463:718">
        <div className="absolute h-[20.192px] left-[calc(66.67%+96px)] opacity-0 top-[256px] w-[57px]" data-node-id="463:719">
          <div className="absolute inset-[0_0.56%_0_0]">
            <img alt="" className="block max-w-none size-full" src={A.imgRectangle3386} />
          </div>
        </div>
        <p className="[word-break:break-word] absolute font-fuzzy leading-[86.52999877929688%] left-[calc(66.67%+101.41px)] not-italic opacity-0 text-[3.13px] text-white top-[260.44px] w-[42.992px]" data-node-id="463:720">
          &ldquo;Hi, I am Roots, I stay on her table and listen to all her rants.&rdquo;
        </p>
      </div>
      <div className="absolute h-[84px] left-[106px] top-[1276px] w-[83px]" data-node-id="463:729" data-name="image 656">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={A.imgImage656} />
      </div>
    </div>
  );
}
