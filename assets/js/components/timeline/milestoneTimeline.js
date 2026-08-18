export function createMilestoneTimeline(milestones = []) {

    if (!milestones.length) {

        return `
            <div class="milestone-empty">
                <i class="fa-regular fa-calendar-xmark"></i>
                <span>No milestone data available.</span>
            </div>
        `;

    }


    /* ==========================================================
       TODAY
       ========================================================== */

    const today = new Date();

    today.setHours(0, 0, 0, 0);


    /* ==========================================================
       SORT MILESTONE BERDASARKAN TANGGAL
       ========================================================== */

    const sortedMilestones = [...milestones].sort(
        (a, b) =>
            parseMilestoneDate(a.date) -
            parseMilestoneDate(b.date)
    );


    /* ==========================================================
       NEXT MILESTONE

       Milestone pertama yang tanggalnya >= TODAY
       ========================================================== */

    const nextIndex =
        sortedMilestones.findIndex(item => {

            const date =
                parseMilestoneDate(item.date);

            return date >= today;

        });


    /* ==========================================================
       TANGGAL AWAL & AKHIR TIMELINE
       ========================================================== */

    const firstDate =
        parseMilestoneDate(
            sortedMilestones[0].date
        );

    const lastDate =
        parseMilestoneDate(
            sortedMilestones[
                sortedMilestones.length - 1
            ].date
        );


    /* ==========================================================
   HITUNG POSISI TODAY
   MENGIKUTI POSISI NODE MILESTONE DI TIMELINE

   Timeline menggunakan:
   display: flex;
   justify-content: space-between;

   Jadi TODAY juga harus dihitung berdasarkan
   SEGMENT milestone, bukan berdasarkan seluruh
   rentang tanggal.
========================================================== */

    let todayPosition = 0;


    /* ==========================================================
       CARI MILESTONE SEBELUM TODAY
    ========================================================== */

    let previousIndex = -1;

    for (let i = 0; i < sortedMilestones.length; i++) {

        const date =
            parseMilestoneDate(
                sortedMilestones[i].date
            );

        if (date <= today) {

            previousIndex = i;

        } else {

            break;

        }

    }


    /* ==========================================================
       CARI MILESTONE SESUDAH TODAY
    ========================================================== */

    const nextIndexForToday =
        previousIndex + 1;


    /* ==========================================================
       TODAY BERADA DI ANTARA DUA MILESTONE
    ========================================================== */

    if (
        previousIndex >= 0 &&
        nextIndexForToday < sortedMilestones.length
    ) {

        const previousDate =
            parseMilestoneDate(
                sortedMilestones[previousIndex].date
            );

        const nextDate =
            parseMilestoneDate(
                sortedMilestones[nextIndexForToday].date
            );


        const totalDuration =
            nextDate.getTime() -
            previousDate.getTime();


        const elapsed =
            today.getTime() -
            previousDate.getTime();


        /*
        ----------------------------------------------------------
        BERAPA % TODAY DI DALAM SEGMENT TERSEBUT
        ----------------------------------------------------------
        */

        const segmentProgress =
            elapsed / totalDuration;


        /*
        ----------------------------------------------------------
        JUMLAH SEGMENT TIMELINE
        ----------------------------------------------------------
    
        Contoh 11 milestone:
    
        M1 -> M2 = segment 0
        M2 -> M3 = segment 1
        ...
        M10 -> M11 = segment 9
    
        Total = 10 segment
        ----------------------------------------------------------
        */

        const totalSegments =
            sortedMilestones.length - 1;


        /*
        ----------------------------------------------------------
        POSISI GLOBAL
    
        previousIndex = posisi milestone sebelumnya
    
        + segmentProgress
        ----------------------------------------------------------
        */

        const globalPosition =
            previousIndex +
            segmentProgress;


        /*
        ----------------------------------------------------------
        KONVERSI KE %
        ----------------------------------------------------------
        */

        todayPosition =
            (
                globalPosition /
                totalSegments
            ) * 100;

    }


    /* ==========================================================
       TODAY SEBELUM MILESTONE PERTAMA
    ========================================================== */

    else if (previousIndex === -1) {

        todayPosition = 0;

    }


    /* ==========================================================
       TODAY SETELAH MILESTONE TERAKHIR
    ========================================================== */

    else {

        todayPosition = 100;

    }


    /* ==========================================================
       BATASI 0 - 100%
    ========================================================== */

    todayPosition =
        Math.max(
            0,
            Math.min(
                100,
                todayPosition
            )
        );
    /* ==========================================================
       RENDER
       ========================================================== */

    return `

        <div class="milestone-wrapper">


            <!-- HEADER -->

            <div class="milestone-header">

                <div class="milestone-heading">

                    <i class="fa-regular fa-calendar"></i>

                    <span>
                        STRATEGIC MILESTONES TIMELINE
                    </span>

                </div>


                <span class="milestone-count">

                    ${sortedMilestones.length}
                    MILESTONES

                </span>

            </div>



            <!-- TIMELINE -->

            <div class="milestone-scroll">

                <div class="milestone-track">


                    <!-- MAIN LINE -->

                    <div class="milestone-line"></div>



                    <!-- TODAY -->

                    <div
                        class="milestone-today"
                        style="left:${todayPosition}%"
                    >

                        <span>TODAY</span>

                        <div class="milestone-today-line"></div>

                        <small>
                            ${formatTodayDate(today)}
                        </small>

                    </div>



                    <!-- MILESTONES -->

                    ${sortedMilestones.map(
        (item, index) => {

            const date =
                parseMilestoneDate(
                    item.date
                );


            /* ==================================================
               STATUS
               ================================================== */

            const completed =
                item.status === "completed";

            const overdue =
                !completed &&
                date < today;


            /* ==================================================
               NEXT MILESTONE
               ================================================== */

            const isNext =
                index === nextIndex &&
                !completed;


            /* ==================================================
               POSISI ATAS / BAWAH
               ================================================== */

            const positionClass =
                index % 2 === 0
                    ? "milestone-top"
                    : "milestone-bottom";


            /* ==================================================
               STATUS CLASS
               ================================================== */

            const statusClass =
                completed
                    ? "completed"
                    : overdue
                        ? "overdue"
                        : "upcoming";


            const highlightClass =
                isNext
                    ? "highlight"
                    : "";


            return `

                                <div class="
                                    milestone-point
                                    ${positionClass}
                                    ${statusClass}
                                    ${highlightClass}
                                ">


                                    <!-- CARD -->

                                    <div class="milestone-card">


                                        <!-- TOP -->

                                        <div class="milestone-card-top">


                                            <span
                                                class="milestone-date"
                                            >

                                                ${formatMilestoneDate(
                item.date
            )}

                                            </span>


                                            <span class="
                                                milestone-status
                                                ${statusClass}
                                            ">

                                                ${completed
                    ? "● COMPLETED"
                    : overdue
                        ? "⚠ OVERDUE"
                        : isNext
                            ? "★ NEXT MILESTONE"
                            : "● UPCOMING"
                }

                                            </span>

                                        </div>



                                        <!-- TITLE -->

                                        <div class="
                                            milestone-title
                                        ">

                                            ${item.title}

                                        </div>



                                        <!-- CODE -->

                                        <div class="
                                            milestone-code
                                        ">

                                            M${index + 1}

                                        </div>


                                    </div>



                                    <!-- NODE -->

                                    <div class="
                                        milestone-node
                                    ">

                                       ${completed

                    ? `
            <i class="fa-solid fa-check"></i>
        `

                    : overdue

                        ? `
                <i class="fa-solid fa-triangle-exclamation"></i>
            `

                        : isNext

                            ? `
                    <i class="fa-solid fa-star"></i>
                `

                            : `
                    <i class="fa-solid fa-circle"></i>
                `
                }

                                    </div>


                                </div>

                            `;

        }
    ).join("")}


                </div>

            </div>

        </div>

    `;

}



/* ==============================================================
   PARSE MILESTONE DATE

   Menghindari masalah timezone JavaScript.

   Contoh:
   2026-08-18
   akan dianggap sebagai 18 Agustus 2026
   bukan bergeser ke tanggal sebelumnya.
   ============================================================== */

function parseMilestoneDate(dateString) {

    if (!dateString) {
        return new Date(NaN);
    }


    /* Jika format YYYY-MM-DD */

    if (
        typeof dateString === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(dateString)
    ) {

        const [
            year,
            month,
            day
        ] = dateString.split("-").map(Number);


        return new Date(
            year,
            month - 1,
            day
        );

    }


    const date =
        new Date(dateString);


    date.setHours(0, 0, 0, 0);


    return date;

}



/* ==============================================================
   FORMAT MILESTONE DATE
   ============================================================== */

function formatMilestoneDate(dateString) {

    const date =
        parseMilestoneDate(dateString);


    if (isNaN(date.getTime())) {

        return dateString;

    }


    return date.toLocaleDateString(
        "id-ID",
        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }
    );

}



/* ==============================================================
   FORMAT TODAY
   ============================================================== */

function formatTodayDate(date) {

    return date.toLocaleDateString(
        "id-ID",
        {

            day: "2-digit",

            month: "short",

            year: "numeric"

        }
    );

}