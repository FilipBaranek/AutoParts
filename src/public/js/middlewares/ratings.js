
function ratingValue(ratings)
{
    let sum = 0;

    for (let i = 0; i < ratings.length; i++)
    {
        sum += ratings[i].value;
    }

    const avg = sum / ratings.length;

    return Math.round((avg / 5) * 100);

}

function getStarCount(ratings)
{
    let star1 = 0;
    let star2 = 0;
    let star3 = 0;
    let star4 = 0;
    let star5 = 0;

    for (let i = 0; i < ratings.length; i++)
    {
        switch (ratings[i].value)
        {
            case 1:
                star1++;
                break;
            case 2:
                star2++;
                break;
            case 3:
                star3++;
                break;
            case 4:
                star4++;
                break;
            case 5:
                star5++;
                break;
        }
    }

    return { star1: star1, star2: star2, star3: star3, star4: star4, star5: star5 };
}

export function getRatingStatistics(ratings)
{
    const statistics = [];
    const stars = getStarCount(ratings);

    statistics.push(Math.round((stars.star1 / ratings.length) * 100));
    statistics.push(Math.round((stars.star2 / ratings.length) * 100));
    statistics.push(Math.round((stars.star3 / ratings.length) * 100));
    statistics.push(Math.round((stars.star4 / ratings.length) * 100));
    statistics.push(Math.round((stars.star5 / ratings.length) * 100));

    return statistics;
}

export function getRatingValue(ratings)
{
    let ratingVal = 0;
    let ratingCount = 0;

    if (ratings !== null && ratings.length > 0) 
    {
        ratingVal = ratingValue(ratings);
        ratingCount = ratings.length;
    }
    const ratingPercentage = 100 - ratingVal;

    return { ratingValue: ratingVal, ratingCount: ratingCount, ratingPercentage: ratingPercentage };
}