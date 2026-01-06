/**
 * <h3>Действия, связанные с возможностью взятия карт из лагеря.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, дающих возможность взять карты из лагеря.</li>
 * </ol>
 *
 * @param context
 * @param card Карта.
 * @returns Возможен ли выбор карты из лагеря.
 */
export const IsCanPickPickCampCardToStack = ({ G }, card) => {
    if (card.validators?.pickCampCardToStack === true) {
        if (G.camp.length > 0) {
            return true;
        }
    }
    return false;
};
/**
 * <h3>Действия, связанные с возможностью взятия карт из колоды сброса.</h3>
 * <p>Применения:</p>
 * <ol>
 * <li>При выборе конкретных героев, дающих возможность взять карты из колоды сброса.</li>
 * <li>При выборе конкретных карт лагеря, дающих возможность взять карты из колоды сброса.</li>
 * </ol>
 *
 * @param context
 * @param card Карта.
 * @returns Возможен ли выбор карты из колоды сброса.
 */
export const IsCanPickPickDiscardCardToStack = ({ G }, card) => {
    if (card.validators?.pickDiscardCardToStack === true) {
        if (G.discardCardsDeck.length > 0) {
            return true;
        }
    }
    return false;
};
//# sourceMappingURL=IsCanAddToStackValidators.js.map