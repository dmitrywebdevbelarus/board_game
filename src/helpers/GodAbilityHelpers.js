import { AllStackData } from "../data/StackData";
import { ThrowMyError } from "../Error";
import { ErrorNames, GodBuffNames, GodNames } from "../typescript/enums";
import { CheckPlayerHasBuff } from "./BuffHelpers";
import { IsLastRound } from "./RoundHelpers";
import { AddActionsToStack } from "./StackHelpers";
export const CheckIsStartUseGodAbility = ({ G, ...rest }, playerID, godName, pickedCard) => {
    const player = G.publicPlayers[playerID];
    if (player === undefined) {
        return ThrowMyError({ G, ...rest }, ErrorNames.PublicPlayerWithCurrentIdIsUndefined, playerID);
    }
    let isStart = false, _exhaustiveCheck;
    switch (godName) {
        case GodNames.Freyja:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GodBuffNames.PlayerHasActiveGodFreyja)) {
                isStart = true;
            }
            break;
        case GodNames.Frigg:
            if (!IsLastRound({ G, ...rest }) && CheckPlayerHasBuff({ G, ...rest }, playerID, GodBuffNames.PlayerHasActiveGodFrigg)) {
                isStart = true;
            }
            break;
        case GodNames.Loki:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GodBuffNames.PlayerHasActiveGodLoki)) {
                isStart = true;
            }
            break;
        case GodNames.Odin:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GodBuffNames.PlayerHasActiveGodOdin)) {
                isStart = true;
            }
            break;
        case GodNames.Thor:
            if (CheckPlayerHasBuff({ G, ...rest }, playerID, GodBuffNames.PlayerHasActiveGodThor)) {
                isStart = true;
            }
            break;
        default:
            _exhaustiveCheck = godName;
            throw new Error(`Нет такой карты '${godName}' среди карт богов.`);
            return _exhaustiveCheck;
    }
    if (isStart) {
        AddActionsToStack({ G, ...rest }, playerID, [AllStackData.activateGodAbilityOrNot(godName, pickedCard)]);
    }
    return isStart;
};
//# sourceMappingURL=GodAbilityHelpers.js.map